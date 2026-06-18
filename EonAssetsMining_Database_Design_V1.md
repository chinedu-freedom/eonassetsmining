# EonAssetsMining - Database Design Document (V1)

## Project Metadata

| Key | Value |
|-----|-------|
| Project Name | EonAssetsMining |
| Database | PostgreSQL |
| ORM | Prisma |
| Document Version | V1 |

---

## Overview

This document defines the core database architecture for EonAssetsMining, covering:

- Users
- Plans
- Investments
- Deposits
- Withdrawals
- Rewards
- Gift codes
- Tasks
- Spin wheel
- News
- Settings
- Logs
- Platform management

---

## Critical Financial Rule (MANDATORY - FIN-001)

> **All balance changes must be recorded in the Transactions ledger table.**
> 
> **Balances must never be updated without creating a transaction record.**

**Enforcement:**
- Database trigger (recommended)
- Prisma middleware
- Application service layer

---

## Complete Prisma Schema

### 1. Admins

```prisma
model admins {
  id           String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email        String    @unique
  password_hash String
  role         admin
  created_at   DateTime  @default(now())
  updated_at   DateTime  @updatedAt

  admin_logs admin_logs[]

  @@map("admins")
}


model users {
  id               String    @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email            String    @unique
  password_hash    String
  full_name        String
  username         String?   @unique
  phone_number     String?
  profile_image    String?
  country_id       String    @db.Uuid
  language_id      String    @db.Uuid
  balance          Decimal   @default(0) @db.Decimal(18, 8)
  gift_balance     Decimal   @default(0) @db.Decimal(18, 8)
  referral_code    String    @unique
  referred_by      String?   @db.Uuid
  email_verified   Boolean   @default(false)
  is_active        Boolean   @default(true)
  last_login       DateTime?
  last_ip          String?
  created_at       DateTime  @default(now())
  updated_at       DateTime  @updatedAt

  // Permissions flags
  can_deposit      Boolean   @default(true)
  can_withdraw     Boolean   @default(true)
  can_earn_daily   Boolean   @default(true)
  can_earn_referral Boolean  @default(true)
  can_access_spin  Boolean   @default(true)
  can_access_checkin Boolean  @default(true)

  country   countries        @relation(fields: [country_id], references: [id])
  language  languages        @relation(fields: [language_id], references: [id])
  referrer  users?           @relation("UserReferral", fields: [referred_by], references: [id])
  referrals users[]          @relation("UserReferral")

  investments         investments[]
  deposits            deposits[]
  withdrawals         withdrawals[]
  transactions        transactions[]
  spin_logs           spin_logs[]
  user_checkins       user_checkins[]
  task_claims         task_claims[]
  gift_code_claims    gift_code_claims[]
  referral_commissions_earned referral_commissions[] @relation("EarnedBy")
  referral_commissions_given  referral_commissions[] @relation("GivenBy")
  activity_logs       activity_logs[]
  email_logs          email_logs[]
  user_spins          user_spins[]

  @@map("users")
}


model password_resets {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id    String   @db.Uuid
  token      String   @unique
  expires_at DateTime
  used       Boolean  @default(false)
  created_at DateTime @default(now())

  user users @relation(fields: [user_id], references: [id])

  @@map("password_resets")
}

model plans {
  id                String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  image             String?
  name              String
  duration          Int      // in days
  daily_income      Decimal  @db.Decimal(10, 6) // percentage
  min_investment    Decimal  @db.Decimal(18, 8)
  max_investment    Decimal  @db.Decimal(18, 8)
  capital_return    Boolean  @default(true)
  status            Boolean  @default(true)
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt

  investments investments[]

  @@map("plans")
}
model investments {
  id               String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id          String          @db.Uuid
  plan_id          String          @db.Uuid
  amount           Decimal         @db.Decimal(18, 8)
  daily_profit     Decimal         @db.Decimal(18, 8)
  total_paid       Decimal         @default(0) @db.Decimal(18, 8)
  remaining_paid   Decimal         @default(0) @db.Decimal(18, 8)
  status           InvestmentStatus
  start_date       DateTime
  end_date         DateTime
  created_at       DateTime        @default(now())

  user     users    @relation(fields: [user_id], references: [id])
  plan     plans    @relation(fields: [plan_id], references: [id])
  profits  investment_profits[]

  @@map("investments")
}

enum InvestmentStatus {
  ACTIVE
  COMPLETED
  CANCELLED
}

model investment_profits {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  investment_id   String   @db.Uuid
  user_id         String   @db.Uuid
  amount          Decimal  @db.Decimal(18, 8)
  paid_date       DateTime @default(now())

  investment investments @relation(fields: [investment_id], references: [id])
  user       users      @relation(fields: [user_id], references: [id])

  @@map("investment_profits")
}
model referral_commissions {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id       String   @db.Uuid // earned by
  from_user_id  String   @db.Uuid // referred user
  amount        Decimal  @db.Decimal(18, 8)
  level         Int      @default(1) // 1, 2, or 3
  created_at    DateTime @default(now())

  earner users @relation("EarnedBy", fields: [user_id], references: [id])
  giver  users @relation("GivenBy", fields: [from_user_id], references: [id])

  @@map("referral_commissions")
}
model gift_codes {
  id            String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  code_name     String
  code          String        @unique
  reward_type   GiftRewardType
  reward_amount Decimal       @db.Decimal(18, 8)
  max_uses      Int
  used_count    Int           @default(0)
  status        Boolean       @default(true)
  expires_at    DateTime?
  created_by    String        @db.Uuid
  created_at    DateTime      @default(now())

  creator admins @relation(fields: [created_by], references: [id])
  claims  gift_code_claims[]

  @@map("gift_codes")
}

enum GiftRewardType {
  MAIN_BALANCE
  GIFT_BALANCE
}
model gift_code_claims {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  gift_code_id  String   @db.Uuid
  user_id       String   @db.Uuid
  reward_amount Decimal  @db.Decimal(18, 8)
  claimed_at    DateTime @default(now())

  gift_code gift_codes @relation(fields: [gift_code_id], references: [id])
  user      users      @relation(fields: [user_id], references: [id])

  @@unique([gift_code_id, user_id])
  @@map("gift_code_claims")
}model tasks {
  id                 String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  task_name          String
  description        String?
  required_referrals Int
  reward_amount      Decimal         @db.Decimal(18, 8)
  status             Boolean         @default(true)
  created_at         DateTime        @default(now())

  claims task_claims[]

  @@map("tasks")
}
model task_claims {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  task_id    String   @db.Uuid
  user_id    String   @db.Uuid
  status     ClaimStatus
  completed_at DateTime @default(now())

  task tasks @relation(fields: [task_id], references: [id])
  user users @relation(fields: [user_id], references: [id])

  @@unique([task_id, user_id])
  @@map("task_claims")
}

enum ClaimStatus {
  PENDING
  COMPLETED
  FAILED
}
model daily_checkins {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  day_number   Int      @unique
  reward_amount Decimal  @db.Decimal(18, 8)
  description  String?
  status       Boolean  @default(true)

  @@map("daily_checkins")
}
model user_checkins {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id       String   @db.Uuid
  checkin_date  DateTime @default(now())
  reward_amount Decimal  @db.Decimal(18, 8)
  day_number    Int

  user users @relation(fields: [user_id], references: [id])

  @@unique([user_id, checkin_date])
  @@map("user_checkins")
}
model spin_prizes {
  id           String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  position     Int         // 1-8 on wheel
  color        String
  name         String
  value        Decimal     @db.Decimal(18, 8)
  weight       Float       // probability weight
  probability  Float       // 0-1
  icon         String?
  is_jackpot   Boolean     @default(false)
  status       Boolean     @default(true)

  logs spin_logs[]

  @@map("spin_prizes")
}
model spin_settings {
  id                    String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  feature_enabled       Boolean  @default(true)
  free_spins_per_deposit Int     @default(1)
  daily_referral_target Int     @default(1)
  spins_for_daily_challenge Int  @default(1)
  cost_per_spin         Decimal  @db.Decimal(18, 8)
  free_spins_daily      Int      @default(1)
  created_at            DateTime @default(now())
  updated_at            DateTime @updatedAt

  @@map("spin_settings")
}

model user_spins {
  id                   String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id              String   @unique @db.Uuid
  free_spins_remaining Int      @default(0)
  total_spins_used     Int      @default(0)
  total_rewards_earned Decimal  @default(0) @db.Decimal(18, 8)
  updated_at           DateTime @updatedAt

  user users @relation(fields: [user_id], references: [id])

  @@map("user_spins")
}
model spin_logs {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id       String   @db.Uuid
  prize_id      String   @db.Uuid
  spin_type     SpinType
  reward_earned Decimal  @db.Decimal(18, 8)
  created_at    DateTime @default(now())

  user users        @relation(fields: [user_id], references: [id])
  prize spin_prizes @relation(fields: [prize_id], references: [id])

  @@map("spin_logs")
}

enum SpinType {
  FREE
  PAID
}

model news {
  id           String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  image        String?
  title        String
  category     String?
  is_featured  Boolean  @default(false)
  description  String?
  content      String   @db.Text
  views        Int      @default(0)
  status       Boolean  @default(true)
  published_at DateTime @default(now())
  created_at   DateTime @default(now())
  updated_at   DateTime @updatedAt

  @@map("news")
}

model partners {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  logo          String
  partner_name  String
  status        Boolean  @default(true)
  display_order Int      @default(0)
  created_at    DateTime @default(now())

  @@map("partners")
}

model market_assets {
  id              String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  symbol          String   @unique
  name            String
  trading_pair    String
  logo_url        String?
  status          Boolean  @default(true)
  current_price   Decimal? @db.Decimal(18, 8)
  price_change_24h Decimal? @db.Decimal(10, 6)
  updated_at      DateTime @updatedAt

  @@map("market_assets")
}

model deposits {
  id               String         @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id          String         @db.Uuid
  amount           Decimal        @db.Decimal(18, 8)
  payment_method_id String         @db.Uuid
  cryptocurrency   String?        // e.g., BTC, USDT
  proof_image_url  String?
  status           DepositStatus
  approved_by      String?        @db.Uuid
  approved_at      DateTime?
  created_at       DateTime       @default(now())

  user          users           @relation(fields: [user_id], references: [id])
  payment_method payment_methods @relation(fields: [payment_method_id], references: [id])
  approver      admins?         @relation(fields: [approved_by], references: [id])

  @@map("deposits")
}

enum DepositStatus {
  PENDING
  APPROVED
  REJECTED
}model withdrawals {
  id                 String            @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id            String            @db.Uuid
  amount             Decimal           @db.Decimal(18, 8)
  withdrawal_method  String
  fees               Decimal           @default(0) @db.Decimal(18, 8)
  net_amount         Decimal           @db.Decimal(18, 8)
  wallet_address     String
  status             WithdrawalStatus
  processed_by       String?           @db.Uuid
  processed_at       DateTime?
  created_at         DateTime          @default(now())

  user      users                @relation(fields: [user_id], references: [id])
  processor admins?              @relation(fields: [processed_by], references: [id])

  @@map("withdrawals")
}

enum WithdrawalStatus {
  PENDING
  APPROVED
  REJECTED
  PAID
}
model transactions {
  id             String          @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id        String          @db.Uuid
  type           TransactionType
  amount         Decimal         @db.Decimal(18, 8)
  balance_before Decimal         @db.Decimal(18, 8)
  balance_after  Decimal         @db.Decimal(18, 8)
  reference_id   String?         @db.Uuid
  description    String
  created_at     DateTime        @default(now())

  user users @relation(fields: [user_id], references: [id])

  @@index([user_id])
  @@index([created_at])
  @@index([type])
  @@map("transactions")
}

enum TransactionType {
  DEPOSIT
  WITHDRAWAL
  INVESTMENT
  PROFIT
  CAPITAL_RETURN
  REFERRAL_COMMISSION
  TASK_REWARD
  GIFT_CODE
  SPIN_REWARD
  CHECKIN_REWARD
  ADMIN_CREDIT
  ADMIN_DEBIT
  ADJUSTMENT
}
model sliders {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  image          String
  title          String?
  display_location SliderLocation
  status         Boolean  @default(true)
  display_order  Int      @default(0)
  created_at     DateTime @default(now())

  @@map("sliders")
}

enum SliderLocation {
  HOMEPAGE
  VIP_PAGE
  DASHBOARD
  PROMOTION_PAGE
}
model countries {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  country_code  String   @unique
  country_name  String
  currency_symbol String
  currency_code String
  exchange_rate Decimal  @db.Decimal(18, 8)
  auto_update   Boolean  @default(false)
  status        Boolean  @default(true)

  users users[]

  @@map("countries")
}
model languages {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  language_code String   @unique
  language_name String
  native_name   String
  flag_emoji    String?
  text_direction String  @default("ltr")
  sort_order    Int      @default(0)
  is_default    Boolean  @default(false)
  status        Boolean  @default(true)

  users users[]

  @@map("languages")
}
model team_members {
  id            String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  image         String?
  name          String
  position      String
  status        Boolean  @default(true)
  display_order Int      @default(0)
  created_at    DateTime @default(now())

  @@map("team_members")
}model payment_methods {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name           String
  type           PaymentMethodType
  min_amount     Decimal  @db.Decimal(18, 8)
  max_amount     Decimal  @db.Decimal(18, 8)
  charges        Decimal  @default(0) @db.Decimal(18, 8)
  status         Boolean  @default(true)
  instructions   String?  @db.Text

  deposits deposits[]
  withdrawals withdrawals[]

  @@map("payment_methods")
}

enum PaymentMethodType {
  DEPOSIT
  WITHDRAWAL
  BOTH
}
model payout_cryptocurrencies {
  id             String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  icon           String?
  name           String
  symbol         String   @unique
  network        String
  min_amount     Decimal  @db.Decimal(18, 8)
  max_amount     Decimal  @db.Decimal(18, 8)
  fee_percentage Decimal  @default(0) @db.Decimal(5, 2)
  fixed_fee      Decimal  @default(0) @db.Decimal(18, 8)
  sort_order     Int      @default(0)
  status         Boolean  @default(true)

  @@map("payout_cryptocurrencies")
}

model email_logs {
  id         String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id    String        @db.Uuid
  recipient  String
  subject    String
  email_type EmailType
  status     EmailStatus
  sent_at    DateTime      @default(now())
  error_msg  String?

  user users @relation(fields: [user_id], references: [id])

  @@map("email_logs")
}

enum EmailType {
  DEPOSIT_INITIATED
  DEPOSIT_APPROVED
  DEPOSIT_REJECTED
  WITHDRAWAL_INITIATED
  WITHDRAWAL_APPROVED
  WITHDRAWAL_REJECTED
  NEWS_UPDATE
  DAILY_PROFIT
  CAPITAL_RETURN
  VERIFICATION
  PASSWORD_RESET
}

enum EmailStatus {
  SENT
  FAILED
}
model email_settings {
  id               String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  smtp_host        String
  smtp_port        Int
  smtp_user        String
  smtp_pass_encrypted String
  from_email       String
  from_name        String
  updated_at       DateTime @updatedAt

  @@map("email_settings")
}
model settings {
  id                       String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  // General
  platform_logo            String?
  site_name                String
  site_title               String
  currency_name            String
  currency_symbol          String
  timezone                 String
  
  // Bonus
  registration_bonus       Decimal  @default(0) @db.Decimal(18, 8)
  welcome_bonus_destination BonusDestination
  
  // Contacts
  telegram_support         String?
  whatsapp_support         String?
  telegram_community       String?
  telegram_group           String?
  
  // Notices
  deposit_notice           String?
  withdrawal_notice        String?
  
  // Deposit settings
  deposit_bonus            Decimal  @default(0) @db.Decimal(5, 2)
  min_deposit              Decimal  @db.Decimal(18, 8)
  max_deposit              Decimal  @db.Decimal(18, 8)
  
  // Withdrawal settings
  daily_withdrawal_limit   Decimal  @db.Decimal(18, 8)
  withdrawal_open_time     String?  // HH:MM format
  withdrawal_close_time    String?  // HH:MM format
  auto_withdrawal          Boolean  @default(false)
  min_withdrawal           Decimal  @db.Decimal(18, 8)
  
  // Referral
  level1_commission        Decimal  @default(0) @db.Decimal(5, 2)
  level2_commission        Decimal  @default(0) @db.Decimal(5, 2)
  level3_commission        Decimal  @default(0) @db.Decimal(5, 2)
  
  updated_at               DateTime @updatedAt

  @@map("settings")
}

enum BonusDestination {
  MAIN_BALANCE
  GIFT_BALANCE
}
model about_us {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  images     String[] // array of image URLs
  content    String   @db.Text
  updated_at DateTime @updatedAt

  @@map("about_us")
}
model activity_logs {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  user_id    String   @db.Uuid
  action     String
  ip_address String
  user_agent String
  details    Json?
  created_at DateTime @default(now())

  user users @relation(fields: [user_id], references: [id])

  @@index([user_id])
  @@index([created_at])
  @@index([action])
  @@map("activity_logs")
}
model admin_logs {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  admin_id   String   @db.Uuid
  action     String
  target_id  String?  @db.Uuid
  target_type String?
  details    Json?
  ip_address String?
  created_at DateTime @default(now())

  admin admins @relation(fields: [admin_id], references: [id])

  @@index([admin_id])
  @@index([created_at])
  @@map("admin_logs")
}
-- Enforces that every balance change has a transaction record
CREATE OR REPLACE FUNCTION enforce_transaction_balance()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND OLD.balance <> NEW.balance THEN
    IF NOT EXISTS (
      SELECT 1 FROM transactions 
      WHERE user_id = NEW.id 
      AND balance_after = NEW.balance
      AND created_at > NOW() - INTERVAL '5 seconds'
    ) THEN
      RAISE EXCEPTION 'Balance change without transaction record (FIN-001 violation)';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_balance_transaction
AFTER UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION enforce_transaction_balance();