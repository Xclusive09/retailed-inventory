# Boutique Inventory Management System

A modern, responsive web-based inventory management system designed specifically for boutique businesses. Built with vanilla JavaScript, HTML5, and styled with Tailwind CSS.

## 🚀 Features

- **User Authentication**: Role-based access control (Admin/Staff)
- **Inventory Management**: Track products, stock levels, and categories
- **Sales Management**: Process orders and track sales performance
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Mock Data System**: Pre-populated demo data for testing
- **Modern UI**: Clean, intuitive interface with Font Awesome icons

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome 6.0
- **Build Tools**: npm, http-server, concurrently
- **Development**: Live reload with Tailwind CSS watching

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd retailed-boutique-inventory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   This will start both the HTTP server and Tailwind CSS watcher.

   Alternatively, you can run commands separately:
   ```bash
   # Start HTTP server only
   npm start

   # Build/watch CSS only
   npm run build:css
   ```

4. **Access the application**
   Open your browser and navigate to `http://localhost:8080`

## 🔐 Default Login Credentials

The system comes with pre-configured demo accounts:

| Role  | Username | Password |
|-------|----------|----------|
| Admin | admin    | admin123 |
| Staff | staff    | staff123 |

## 📁 Project Structure

```
retailed-boutique-inventory/
├── assets/
│   ├── css/
│   │   └── styles.css          # Tailwind CSS styles
│   ├── data/
│   │   └── mock-data.js        # Demo data initialization
│   └── js/
│       ├── main.js             # Main application entry point
│       └── auth.js             # Authentication logic
├── pages/
│   └── [page-files].html       # Application pages
├── index.html                  # Login page
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind configuration
├── .gitignore                  # Git ignore rules
└── README.md                   # This file
```

## 🎯 Key Components

### Authentication System (`assets/js/auth.js`)
- Handles user login/logout
- Role-based access control
- Route protection
- Session management with localStorage

### Main Application (`assets/js/main.js`)
- Application initialization
- Mock data setup
- Route protection integration

### Mock Data System (`assets/data/mock-data.js`)
- Pre-populated inventory data
- User accounts setup
- Demo categories and products

### Styling (`assets/css/styles.css`)
- Tailwind CSS framework
- Custom component styles
- Responsive design utilities

## 🚀 Development Workflow

1. **Start development environment**
   ```bash
   npm run dev
   ```

2. **Make changes to files**
   - HTML files for structure
   - JavaScript files for functionality
   - CSS classes using Tailwind utilities

3. **Tailwind CSS will auto-rebuild** when you modify classes in HTML/JS files

4. **Refresh browser** to see changes (or use live reload extension)

## 📱 Responsive Design

The application is built with a mobile-first approach:
- **Mobile**: Optimized for small screens (320px+)
- **Tablet**: Enhanced layout for medium screens (768px+)
- **Desktop**: Full-featured layout for large screens (1024px+)

## 🔧 Configuration

### Tailwind CSS (`tailwind.config.js`)
```javascript
module.exports = {
  content: [
    "./pages/**/*.{html,js}",
    "./assets/**/*.{html,js}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Package Scripts (`package.json`)
- `npm start`: Start HTTP server
- `npm run build:css`: Build/watch Tailwind CSS
- `npm run dev`: Run both server and CSS watcher

## 🎨 Styling Guidelines

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent color scheme (blue primary)
- Use Font Awesome icons for consistency

## 🔒 Security Features

- Client-side authentication (demo purposes)
- Route protection for authenticated pages
- Session management
- Input validation on forms

## 🐛 Troubleshooting

### Common Issues

1. **CSS not updating**
   - Ensure Tailwind watcher is running: `npm run build:css`
   - Check content paths in `tailwind.config.js`

2. **JavaScript modules not loading**
   - Verify file paths are correct
   - Ensure using `type="module"` in script tags

3. **Authentication not working**
   - Check localStorage is enabled in browser
   - Verify credentials match mock data

### Development Tips

- Use browser developer tools for debugging
- Check console for JavaScript errors
- Verify network requests in Network tab
- Use Tailwind CSS IntelliSense extension in VS Code

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review code comments for implementation details

## 🔮 Future Enhancements

- Backend integration (Node.js/Express)
- Database connectivity (MongoDB/PostgreSQL)
- Real-time notifications
- Advanced reporting features
- Export functionality (PDF/Excel)
- Multi-language support
- Dark mode theme

---

**Note**: This is a demo application built for educational purposes. For production use, implement proper backend authentication, data persistence, and security measures.