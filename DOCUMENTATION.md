# oU1TS Portal Documentation

A centralized hub for UITS students to access resources, projects, and community links.

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
├── style.css           # Main stylesheet
├── script.js           # JavaScript functionality
└── DOCUMENTATION.md    # This file
```

## Pages Overview

### Homepage (`index.html`)
- **Hero Section**: Portal title, tagline, and "Submit Resource" button
- **Category Cards**: 6 clickable cards linking to category pages
- **Featured Projects Marquee**: Horizontal scrolling showcase

### Category Pages
Each category page includes:
- Back button navigation
- Category header with icon
- "+ Add Link" button (links to Google Form)
- Numbered list of resources

| Page | Category | Description |
|------|----------|-------------|
| `official.html` | Official UITS | University portals & notices |
| `materials.html` | Materials | Study resources & drives |
| `tools.html` | Tools | Project tools & utilities |
| `community.html` | Community | Social links & groups |
| `portfolios.html` | Portfolios | Student showcases |
| `courses.html` | Course Repos | Dropdown menus with GitHub repos |

## Customization

### Adding New Resources
1. Open the corresponding category page
2. Add a new `.project-item` div inside `.project-list`
3. Follow the existing item structure

### Modifying Course Repositories
In `courses.html`, each course has a dropdown structure:
```html
<div class="course-dropdown">
    <button class="course-header">Course Name</button>
    <div class="course-content">
        <!-- Repository links here -->
    </div>
</div>
```

### Submit Button Links
Update the Google Form URL in the `href` attribute of `.submit-btn` elements.

## Changelog

### v2.0 - UIU LinkSphere Restructure
- Restructured homepage with hero section and category cards
- Added 6 new category pages
- Added featured projects marquee
- Added Course Repositories with dropdown menus
- Preserved existing dark theme styling
