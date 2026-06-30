# EonAssetsMining - Platform PRD (AI-Ready)

## 1. Project Overview

**Platform Name:** EonAssetsMining  
**Type:** Web-based investment management platform  
**Components:**
- User Dashboard
- Admin Dashboard

**Core Features:**
- Deposit funds
- Purchase investment plans
- Earn daily profits
- Daily Check-In
- Gift Codes
- Referral Tasks
- Spin Wheel rewards

**Key Principle:** All configurable features must be manageable from the Admin Dashboard without modifying application code.

---

## 2. User Roles

### Admin
Single administrator with unrestricted access.

**Responsibilities:**
- User management
- Financial management
- Platform configuration
- Plan management
- Reward management
- Content management
- Email configuration
- Country and currency management
- System monitoring

### User

**Permissions:**
- Register
- Login
- Deposit funds
- Purchase plans
- Earn profits
- Withdraw funds
- Claim rewards
- Complete referral tasks
- Redeem gift codes
- View news
- View partners
- View live crypto market data

---

## 3. User Dashboard Modules

### 3.1 Dashboard
**Displays:**
- Main Balance
- Gift Balance
- Active Investments
- Total Earnings
- Total Deposits
- Total Withdrawals
- Referral Earnings
- Daily Profit
- Slider Images
- Latest News
- Market Data

### 3.2 Investment Plans
**User Actions:**
- Browse plans
- View plan details
- Purchase plans

**Plan Details Display:**
- Image
- Plan Name
- Duration
- Daily Income
- Minimum Investment
- Maximum Investment
- Capital Return
- Status

### 3.3 Deposits
**User Actions:**
- Deposit funds
- Select payment method
- Upload proof where applicable
- View deposit history

### 3.4 Withdrawals
**User Actions:**
- Submit withdrawal requests
- Select payout method
- View withdrawal history

**Restrictions:**
- Withdrawal hours
- Withdrawal limits
- Active investment requirements

### 3.5 Gift Codes
**User Actions:**
- Redeem gift codes

**Reward Destinations:**
- Main Balance
- Gift Balance

### 3.6 Daily Check-In
**User Actions:**
- Claim daily rewards
- Complete 7-day reward cycles

### 3.7 Lucky Spin
**User Actions:**
- Use free spins
- Use paid spins
- Win rewards

**Reward Destination:** Main Balance

### 3.8 Referral Tasks
**User Actions:**
- Complete referral-based tasks
- Earn rewards

**Example:** Invite 1 Registered User → Reward: $10

### 3.9 News Center
**User Actions:**
- View news articles
- Read announcements
- View featured articles

### 3.10 Partners
**User Actions:**
- View platform partners

### 3.11 Live Market
**Displays:**
- Cryptocurrency prices
- Market symbols
- Trading pairs

**Configurable:** Feature can be enabled/disabled by admin.

---

## 4. Admin Dashboard Modules

### 4.1 Dashboard Overview

**Metrics Display:**
- Total Users
- Active Users
- Total Deposits
- Total Withdrawals
- Total Investments
- Pending Deposits
- Pending Withdrawals
- Total Profits Paid
- Total Spin Rewards Paid
- Total Gift Rewards Paid

### 4.2 Plan Management

**Admin Actions:** Create, View, Edit, Delete Plan

**Plan Fields:**
- Image
- Name
- Duration
- Daily Income
- Minimum Deposit
- Maximum Deposit
- Capital Return
- Status

### 4.3 Gift Code Management

**Admin Actions:** Create, View, Edit, Delete Gift Code

**Gift Code Fields:**
- Code Name
- Gift Code
- Reward Amount
- Usage Count
- Maximum Uses
- Status

**Gift Code Usage List Display:**
- User Information
- Gift Code Used
- Reward Amount
- Usage Date
- Status

### 4.4 Task Management

**Admin Actions:** Create, Edit, Delete, View Task

**Task Fields:**
- Task Name
- Description
- Required Referrals
- Reward Amount
- Status

**Example:** Invite 5 Registered Users → Reward: $20

### 4.5 Daily Check-In Management

**Admin Actions:**
- Enable/Disable Feature
- Create/Update/Delete Reward Day

**Check-In Fields:**
- Day Number (Day 1 to Day 7)
- Reward Amount
- Description
- Status

### 4.6 Spin Wheel Management

**Admin Actions:**
- Enable/Disable Feature
- Configure Spin Cost
- Configure Free Spins

**Prize Fields:**
- Position
- Color
- Name
- Value
- Weight
- Probability
- Icon
- Jackpot Status (only one jackpot allowed)
- Status

**Free Spin Configuration:**
- Free Spins Per Deposit
- Daily Referral Target
- Spins For Daily Challenge

**Spin Statistics Display:**
- Total Prizes
- Active Prizes
- Total Spins
- Total Rewards Paid
- Free Spins Used

### 4.7 News Management

**Admin Actions:** Create, View, Update, Delete News

**News Fields:**
- Image
- Title
- Category
- Featured
- Description
- Content
- Views
- Status
- Timestamp

### 4.8 Partner Management

**Admin Actions:** Create, Edit, Delete, View Partner

**Partner Fields:**
- Logo/Image
- Partner Name
- Status

### 4.9 Live Market Management

**Admin Actions:**
- Enable/Disable Feature
- Add/Edit/Delete Asset

**Asset Fields:**
- Symbol
- Name
- Trading Pair
- Logo URL
- Status

**Example:** BTC → Trading Pair: BTCUSDT

### 4.10 Customer Management

**Admin Actions:**
- View Users
- Edit Users
- Delete Users
- Login As User
- Reset Password
- Credit Balance
- Debit Balance

**User Profile Information Display:**
- User ID
- Profile Image
- Full Name
- Username
- Email
- Country
- Country Code
- Referral ID
- Referrer
- Registration Date
- Last Login
- Last IP Address
- Status

**User Balances Display:**
- Main Balance
- Gift Balance

**Manual Credit/Debit Fields:**
- Amount
- Balance Type
- Reason (Optional)

**User Permissions (per user):**
Admin can enable/disable:
- Deposits
- Withdrawals
- Daily Earnings
- Referral Earnings
- Spin Wheel Access
- Daily Check-In Access

### 4.11 Activity Monitor

**Statistics Display:**
- Activity Today
- Active Users
- Logins Today
- Deposits Today
- Withdrawals Today
- Registrations Today

**Activity Log Types:**
- User Login
- Password Reset
- User Registered
- Deposit Initiated
- Deposit Completed
- Withdrawal Requested
- Gift Claimed
- Spin Wheel Played
- Daily Check-In Claimed
- Plan Purchased
- Profile Updated
- Admin Credit
- Admin Debit
- User Banned
- User Unbanned

### 4.12 Purchase Management

**Displays:**
- User Information
- Plan Purchased
- Plan Image
- Purchase Amount
- Purchase Date
- Status

### 4.13 Deposit Management

**Displays:**
- User Information
- Payment Information
- Cryptocurrency
- Amount
- Proof
- Timestamp
- Status

**Admin Actions:** Approve, Reject, Update Status

### 4.14 Withdrawal Management

**Displays:**
- User Information
- Withdrawal Method
- Amount
- Fees
- Net Amount
- Timestamp
- Status

**Admin Actions:** Approve, Reject, Update Status

### 4.15 Slider Management

**Admin Actions:** Create, Edit, Delete Slider

**Slider Fields:**
- Image
- Display Location
- Status

**Locations:**
- Homepage
- VIP Page
- Dashboard
- Promotion Page

### 4.16 Settings

#### General Settings
- Platform Logo
- Site Name
- Site Title
- Currency Name
- Currency Symbol
- Timezone

#### Bonus Settings
- Registration Bonus
- Welcome Bonus Destination (Main Balance / Gift Balance)

#### Contact & Support Settings
- Telegram Support
- WhatsApp Support
- Telegram Community Channel
- Telegram Group Chat

#### Notice Messages
- Deposit Notice
- Withdrawal Notice

#### Deposit Settings
- Deposit Bonus
- Minimum Deposit
- Maximum Deposit

#### Withdrawal Settings
- Daily Withdrawal Limit
- Withdrawal Opening Time
- Withdrawal Closing Time
- Automatic Withdrawal (Enabled: Auto Process / Disabled: Manual Approval)

### 4.17 Country & Currency Management

**Admin Actions:** Create, Update, Delete Country

**Fields:**
- Country Code
- Country Name
- Currency Symbol
- Currency Code
- Exchange Rate
- Auto Update
- Status

**Example:** NG → Nigeria → N → NGN

### 4.18 Language Management

**Admin Actions:** Create, Edit, Delete Language

**Fields:**
- Language Code
- Language Name
- Native Name
- Flag Emoji
- Text Direction
- Sort Order
- Status

**Supports:** Default Language Selection

### 4.19 About Us Management

**Admin Actions:** Update About Images, About Content

**Visibility:** Visible on user dashboard

### 4.20 Team Management

**Admin Actions:** Add, Edit, Delete Team Member

**Fields:**
- Image
- Name
- Position
- Status

### 4.21 Referral Commission Management

**Supports:**
- Level 1 Commission
- Level 2 Commission
- Level 3 Commission

**Commission Source:** Investment Earnings

### 4.22 Payment Methods

**Supports:** Deposit Methods, Withdrawal Methods

**Fields:**
- Minimum Amount
- Maximum Amount
- Charges
- Status

### 4.23 Payout Cryptocurrencies

**Fields:**
- Icon
- Name
- Symbol
- Network
- Minimum Amount
- Maximum Amount
- Fee Percentage
- Fixed Fee
- Sort Order
- Status

### 4.24 Email Configuration

**Email Notification Preferences:**
- Deposit Initiated
- Deposit Approved
- Deposit Rejected
- Withdrawal Initiated
- Withdrawal Approved
- Withdrawal Rejected
- News Updates
- Daily Profit
- Capital Return

**Email Logs Display:**
- Recipient
- Subject
- Status
- Sent Date
- Delivery Result

---

## 5. Financial Engine

**Automated Processes:**
- Daily Profit Distribution
- Capital Return Distribution
- Referral Commission Distribution
- Gift Code Rewards
- Daily Check-In Rewards
- Spin Rewards
- Task Rewards

---

## 6. System Requirements

### Frontend
- Next.js 16
- JavaScript
- Tailwind CSS
- Shadcn UI

### Backend
- Next.js API Routes
- Server Actions

### Database
- PostgreSQL
- Prisma ORM

### Storage
- Cloudinary

### Queue Processing
- Redis
- BullMQ

---

## 7. Core Principle

> Every user-facing feature must be configurable from the Admin Dashboard.

The Admin Dashboard serves as the master control center for EonAssetsMining, allowing a single administrator to manage platform operations, user activities, financial transactions, rewards, content, settings, and business rules without requiring code changes or system redeployment.

---

## 8. AI Implementation Notes

**Build order recommendation:**
1. Database schema (based on previous DB design document)
2. Authentication system
3. Admin Dashboard foundation
4. User Dashboard foundation
5. Financial engine (daily profits, commissions)
6. Each module in order of priority

**Priority modules:**
1. User management
2. Deposit/Withdrawal
3. Investment plans
4. Financial engine
5. Reward systems (Check-in, Spin, Gift codes, Tasks)
6. Content management (News, Partners, Sliders)
7. Settings & configuration

---

**END OF PRD**