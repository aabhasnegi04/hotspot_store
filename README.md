# Hotspot Store 🛍️

A modern e-commerce platform built with React and Node.js, featuring a beautiful user interface and robust backend functionality.


## 🌟 Features

- **Modern UI/UX**: Beautiful and responsive design
- **Product Management**: Easy product listing and management
- **Secure Authentication**: User authentication and authorization
- **Shopping Cart**: Real-time cart management
- **Order Processing**: Streamlined order management system
- **Admin Dashboard**: Comprehensive admin interface

## 🚀 Tech Stack

### Frontend
- React.js
- Redux for state management
- Material-UI for beautiful components
- Responsive design

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/aabhasnegi04/hotspot_store.git
   cd hotspot_store
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend_copy
   npm install

   # Install frontend dependencies
   cd ../hp_frontend_copy
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the environment variables as needed

4. **Start the development servers**
   ```bash
   # Start backend server
   cd backend_copy
   npm start

   # Start frontend server
   cd ../hp_frontend_copy
   npm start
   ```

## 🔧 Configuration

### Backend Configuration
- Update `.env` file in `backend_copy` directory
- Configure MongoDB connection string
- Set JWT secret key

### Frontend Configuration
- Update API endpoints in frontend configuration
- Configure environment variables

## 📁 Project Structure

```
hotspot_store/
├── backend_copy/           # Backend server
│   ├── config/            # Configuration files
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── server.js          # Main server file
│
└── hp_frontend_copy/      # Frontend application
    ├── public/            # Static files
    ├── src/               # Source code
    │   ├── components/    # React components
    │   ├── pages/         # Page components
    │   └── redux/         # State management
    └── build/             # Production build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Your Name - [@aabhasnegi04](https://github.com/aabhasnegi04)

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their amazing tools and libraries

## 📞 Support

For support, email aabhasnegi004@gmail.com.

---

<div align="center">
  <sub>Built with ❤️ by Aabhas Negi</sub>
</div>
