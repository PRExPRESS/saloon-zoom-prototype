# ZOOM Unisex Salon - Website Project

## 🏗️ Professional Project Structure

This project has been reorganized following senior frontend engineering best practices with a modular, maintainable architecture.

```
zoom-saloon/
├── assets/
│   ├── css/
│   │   ├── main.css          # Global styles, variables, header, footer, FAB
│   │   ├── home.css          # Home page specific styles
│   │   └── about.css         # About page specific styles
│   └── js/
│       ├── components.js     # Dynamic component loader
│       └── main.js           # Core functionality (scroll, menu, FAB)
├── components/
│   ├── navbar.html           # Reusable navigation component
│   ├── footer.html           # Reusable footer component
│   └── fab.html              # Reusable floating action button
├── index.html                # Home page
├── about.html                # About page
├── rates.html                # Rates & services page
├── team.html                 # Team page
└── booking.html              # Booking page
```

## 🎨 Architecture Overview

### Component-Based Design
All pages use reusable components loaded dynamically:
- **Navigation**: `<div data-component="navbar"></div>`
- **Footer**: `<div data-component="footer"></div>`
- **FAB**: `<div data-component="fab"></div>`

### CSS Structure
- **main.css**: Base styles, CSS variables, typography, buttons, navigation, footer, FAB
- **page-specific.css**: Unique styles for each page (home.css, about.css, etc.)

### JavaScript Modules
- **components.js**: Loads HTML components dynamically
- **main.js**: Handles scroll effects, mobile menu, FAB interactions, active nav links

## 🚀 Key Features

### 1. Modular Components
- Single source of truth for navigation, footer, and FAB
- Update once, reflect everywhere
- Easy to maintain and extend

### 2. Separated Concerns
- CSS variables for consistent theming
- Page-specific styles isolated
- JavaScript functionality modularized

### 3. Premium Design Maintained
- All original premium aesthetics preserved
- Smooth animations and transitions
- Responsive mobile-first design
- Professional hover effects

### 4. Optimized Navigation
- Removed redundant "Book Appointment" button from header
- Streamlined menu structure
- "Book Appointment" now integrated in main navigation
- Clean, professional appearance

## 📝 How to Add New Pages

1. Create new HTML file with this structure:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title | ZOOM Unisex Salon</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Montserrat:wght@500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/your-page.css">
</head>
<body>
    <div data-component="navbar"></div>
    
    <!-- Your page content -->
    
    <div data-component="footer"></div>
    <div data-component="fab"></div>
    
    <script src="assets/js/components.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>
```

2. Create page-specific CSS in `assets/css/your-page.css`
3. Add navigation link in `components/navbar.html`

## 🔧 How to Update Components

### Update Navigation
Edit `components/navbar.html` - changes reflect on all pages

### Update Footer
Edit `components/footer.html` - changes reflect on all pages

### Update FAB
Edit `components/fab.html` - changes reflect on all pages

## 🎯 Benefits of This Structure

1. **Maintainability**: Change once, update everywhere
2. **Scalability**: Easy to add new pages and features
3. **Consistency**: Guaranteed UI consistency across all pages
4. **Performance**: Cached components load faster
5. **Clean Code**: Separated concerns, no inline styles
6. **Professional**: Industry-standard architecture

## 💡 CSS Variables

All brand colors and design tokens are centralized:
```css
--bg-dark: #0a0a0a
--bg-card: #161616
--zoom-orange: #F37021
--zoom-orange-hover: #ff8640
--text-main: #ffffff
--text-muted: #a3a3a3
```

Update once in `assets/css/main.css` to change site-wide.

## 🔄 Migration Notes

- Original files backed up with `.backup` extension
- All functionality preserved
- Premium design maintained
- Improved code organization
- Better performance through separation

---

**Built with precision by a senior frontend engineer**
**Maintaining ZOOM's commitment to excellence**
