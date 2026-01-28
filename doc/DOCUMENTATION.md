# oU1TS Portal Documentation

A centralized hub for UITS students to access resources, projects, and community links. Built with vanilla HTML, CSS, and JavaScript for maximum simplicity and portability.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Pages Overview](#pages-overview)
- [Customization Guide](#customization)
- [Google Sheets Integration](#google-sheets-setup)
- [Changelog](#changelog)

---

## Project Structure

```
ou1ts.portal/
├── index.html          # Homepage with hero, categories, featured marquee
├── official.html       # Official UITS - Portals & Notices
├── materials.html      # Materials - Drive & Other links
├── tools.html          # Tools - Projects
├── community.html      # Community - Groups & Social
├── portfolios.html     # Portfolios - Showcases
├── courses.html        # Course Repositories - GitHub repos per course
├── contributions.html  # Contributors - Dynamic page with Google Sheets integration
├── style.css           # Main stylesheet (shared across all pages)
├── script.js           # JavaScript functionality (sidebar, mobile menu)
├── portfolio-icon/     # Icons and assets for portfolio section
└── DOCUMENTATION.md    # This documentation file
```

---

## Pages Overview

### Homepage (`index.html`)

The main landing page with the following sections:

| Section | Description |
|---------|-------------|
| **Hero Section** | Portal title "oU1TS Portal", tagline, and "Submit Resource" button linking to Google Form |
| **Featured Projects Marquee** | Horizontal auto-scrolling showcase of highlighted student projects |
| **Category Cards** | 7 clickable cards linking to category pages (Materials, Tools, Community, Course Repos, Portfolios, Official UITS, Contributors) |
| **About Section** | Description of the oU1TS initiative |
| **Socials Section** | Links to Facebook, Telegram, Discord, GitHub, Reddit |
| **App Download** | QR code for the mobile app version (v2.0) |

**Sidebar Navigation:**
- Collapsible sidebar for mobile devices
- Quick links to all sections
- "Open in App" button

---

### Category Pages

Each category page follows a consistent structure:

```html
<div class="category-page">
    <header class="category-header">
        <!-- Back button, icon, title, and "Add Link" button -->
    </header>
    <div class="project-list">
        <!-- List of .project-item elements -->
    </div>
</div>
```

| Page | Category | Icon | Description |
|------|----------|------|-------------|
| `official.html` | Official UITS | 🌐 Globe | University portals (Student Portal, Library, Notice Board) |
| `materials.html` | Materials | 🎓 Graduation Cap | Google Drive links, study resources, notes |
| `tools.html` | Tools | 📖 Book Open | Student-made tools and utilities |
| `community.html` | Community | 🔗 Share Nodes | Social groups, Facebook groups, Discord servers |
| `portfolios.html` | Portfolios | 👤 User | Student portfolio showcases |
| `courses.html` | Course Repos | 📦 GitHub | GitHub repositories organized by course with dropdown menus |

**Common Features:**
- Back button → returns to `index.html`
- "+ ADD LINK" button → opens Google Form for submissions
- Numbered project items with visit/copy buttons
- Consistent dark theme styling

---

### Contributors Page (`contributions.html`)

A dynamic page that fetches contributor data from Google Sheets in real-time.

**Features:**
| Feature | Description |
|---------|-------------|
| **Dynamic Data Fetching** | Pulls data from Google Sheets on page load |
| **Contributor Cards** | Displays name, email, department, batch, and resource count |
| **Grouped by Name** | Multiple submissions by the same person are grouped |
| **Sorted by Contributions** | Top contributors appear first |
| **Clickable Cards** | Opens modal popup with resource details |
| **Modal Popup** | Shows all resources submitted by a contributor with title, type, and link |
| **Loading State** | Spinner displayed while fetching data |
| **Empty State** | Shown when no contributions exist |
| **Error State** | Displayed if fetch fails |

**Modal Features:**
- Click card to open
- Click ✕, overlay, or press Escape to close
- **Contact Information Section:**
  - Email (clickable mailto: link with envelope icon)
  - Social Links (clickable if URL, with link icon)
  - Fallback message if no contact info provided
- **Resources Section:**
  - Project Title
  - Project Type (as badge)
  - Project Link (clickable, opens in new tab)

---

## Customization

### Adding New Resources Manually

1. Open the corresponding category page (e.g., `materials.html`)
2. Locate the `.project-list` div
3. Add a new `.project-item` following this structure:

```html
<div class="project-item">
    <span class="project-number">01</span>
    <div class="project-icon" style="background: linear-gradient(135deg, #e3f2fd, #bbdefb);">
        <i class="fa-solid fa-icon-name" style="color: #1976d2;"></i>
    </div>
    <div class="project-info">
        <h3>Resource Title</h3>
        <p>https://example.com/</p>
    </div>
    <div class="project-actions">
        <a href="https://example.com/" class="visit-btn" target="_blank">
            Visit <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        <button class="copy-btn" onclick="copyLink('https://example.com/')">
            <i class="fa-regular fa-copy"></i>
        </button>
    </div>
</div>
```

### Modifying Course Repositories

In `courses.html`, each course uses a dropdown structure:

```html
<div class="course-dropdown">
    <button class="course-header">
        <span>Course Name (CODE)</span>
        <i class="fa-solid fa-chevron-down"></i>
    </button>
    <div class="course-content">
        <div class="repo-item">
            <a href="https://github.com/..." target="_blank">Repository Name</a>
            <span class="repo-author">by Author</span>
        </div>
    </div>
</div>
```

### Updating Form Links

The Google Form URL appears in multiple places:

| Location | Element |
|----------|---------|
| Homepage hero | `.submit-btn` |
| Category pages | `.add-link-btn` |
| Contributors empty state | `.submit-resource-btn` |

**Current Form URL:** `https://forms.gle/UR1HSavWJYdPBPnC8`

### Styling Customization

The site uses a consistent color scheme defined in `style.css`:

| Color | Usage |
|-------|-------|
| `#1a1a2e` | Primary background |
| `#16213e` | Secondary background |
| `#64b5f6` | Accent blue |
| `#e0e6ed` | Primary text |
| `#a0a0a0` | Secondary text |

---

## Google Sheets Setup

The Contributors page fetches data dynamically from a Google Sheet linked to the submission form.

### How It Works
1. User submits a resource via Google Form
2. Response is automatically saved to Google Sheet
3. Contributors page fetches sheet data via Google Visualization API
4. Data is parsed, grouped by contributor name, and displayed

### Publishing the Sheet (Required)
1. Open the Google Sheet: [Link](https://docs.google.com/spreadsheets/d/1oQ5Mkavjm62UGZwNjM-52yvKppWZHfX-Qpq6jtEVIOY/)
2. Go to **File → Share → Publish to web**
3. Select **"Entire Document"** or the specific sheet tab
4. Click **Publish** and confirm

### Column Mapping (0-indexed)

| Index | Column Name | Used For |
|-------|-------------|----------|
| 0 | Timestamp | Not displayed |
| 1 | Email Address | Not displayed |
| 2 | Student Education Email | Displayed on contributor card & modal |
| 3 | What is this submission for? | Not displayed |
| 4 | Your Name | Contributor name (grouping key) |
| 5 | Contacts and Social Links | Displayed in modal contact section |
| 6 | Project Title | Shown in modal popup |
| 7 | Project Link | Clickable link in modal |
| 8 | Project Type | Badge in modal popup |
| 9 | Department | Shown on contributor card |
| 10 | Batch | Shown on contributor card |

### Modifying Column Indices

Edit the constants at the top of the `<script>` section in `contributions.html`:

```javascript
const COL_EMAIL = 2;           // Student Education Email
const COL_NAME = 4;            // Your Name
const COL_SOCIAL = 5;          // Contacts and Social Links
const COL_PROJECT_TITLE = 6;   // Project Title
const COL_PROJECT_LINK = 7;    // Project Link
const COL_PROJECT_TYPE = 8;    // Project Type
const COL_DEPARTMENT = 9;      // Department
const COL_BATCH = 10;          // Batch
```

### Changing the Google Sheet

To use a different Google Sheet:
1. Get the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/edit`
2. Update the `SHEET_ID` constant in `contributions.html`:
```javascript
const SHEET_ID = 'your-new-sheet-id-here';
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Loading spinner stuck | Ensure sheet is published to web |
| Error state shown | Check browser console for errors; verify sheet ID |
| Data not updating | Refresh the page; published sheets have slight delay |
| Wrong data displayed | Verify column indices match your form structure |

---

## Changelog

### v2.0 - UIU LinkSphere Restructure
- Restructured homepage with hero section and category cards
- Added 6 new category pages (Materials, Tools, Community, Course Repos, Portfolios, Official UITS)
- Added featured projects marquee with auto-scroll
- Added Course Repositories with dropdown menus
- Implemented responsive sidebar navigation
- Preserved existing dark theme styling

### v2.1 - Contributors Page
- Added `contributions.html` page to recognize resource submitters
- Added Contributors category card to homepage under "Official UITS" with visual divider
- Page design inspired by https://diuqbank.com/contributors/
- Includes empty state and submit button

### v2.2 - Google Sheets Integration
- Contributors page now fetches data dynamically from Google Sheets
- Auto-updates when new form submissions are added (on page refresh)
- Groups contributors by name and displays submission count
- Shows Department and Batch info from form responses
- Includes loading, empty, and error states
- **Google Sheet ID**: `1oQ5Mkavjm62UGZwNjM-52yvKppWZHfX-Qpq6jtEVIOY`

### v2.3 - Enhanced Contributors Page
- Added Student Education Email display on contributor cards
- Added clickable cards that open a modal popup
- Modal shows all resources submitted by the contributor:
  - Project Title
  - Project Type (as badge)
  - Project Link (clickable, opens in new tab)
- Modal can be closed via ✕ button, clicking overlay, or pressing Escape
- Improved data handling to store all submissions per contributor
- Updated column mapping to include project details (columns 6, 7, 8)

### v2.4 - Modal Contact Information
- Modal now displays Contact Information section with:
  - Student Education Email (clickable mailto: link)
  - Social Links (clickable if URL format detected)
- Department and Batch shown as subtitle in modal header
- Added styled contact info card with icons
- Fallback message when no contact information is provided
- Resources section now has dedicated header

---

## Credits

- **Design Inspiration**: [UIU LinkSphere](https://uiulinks.vercel.app/)
- **Contributors Page Design**: [DIUQBank Contributors](https://diuqbank.com/contributors/)
- **Icons**: [Font Awesome 6.5.0](https://fontawesome.com/)
- **Built by**: oU1TS Initiative - Students of UITS
