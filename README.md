# HMCTS Task Management System - Frontend

A modern, responsive web application for managing caseworker tasks built with React and TypeScript.

## 🚀 Technology Stack

- **React 19**
- **TypeScript**
- **Vite** (build tool)
- **Axios** (HTTP client)
- **Tailwind CSS** (styling)
- **ESLint** (code quality)

## 📋 Features

- Create new tasks with title, description, status, and due date/time
- View all tasks in a clean, organized list
- Edit existing tasks
- Update task status with dropdown
- Delete tasks with confirmation
- Responsive design for all screen sizes
- Real-time validation
- Error handling and user feedback
- Overdue task indicators
- Date/time formatting

## 🏗️ Project Structure

```
src/
├── components/
│   ├── TaskForm.tsx      # Task creation/editing form
│   └── TaskList.tsx      # Task list display
├── services/
│   └── api.ts           # API service layer
├── types/
│   └── Task.ts          # TypeScript type definitions
├── App.css              # Global styles
└── main.tsx             # Application entry point
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8080`

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/espogee/hmcts-task-manager-frontend
cd hmcts-task-manager-frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure API endpoint (if different from default):
Edit `src/services/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api/tasks';
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:5173`

## 🎨 User Interface

### Task Form
- **Title**: Required field for task name
- **Description**: Optional field for detailed information
- **Status**: Dropdown with TODO, IN_PROGRESS, COMPLETED, CANCELLED
- **Due Date/Time**: Date/time picker (validates future dates)

### Task List
- Displays all tasks with color-coded status badges
- Shows creation and due dates
- Overdue tasks highlighted in red
- Quick status change dropdown
- Edit and Delete action buttons

### Status Colors
- **TODO**: Gray
- **IN_PROGRESS**: Blue
- **COMPLETED**: Green
- **CANCELLED**: Red

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

```

### Environment Setup

Create `.env` file for environment variables:
```
API_BASE_URL=http://localhost:8080/api/tasks
```

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code quality
- Functional components with hooks
- Tailwind CSS utility classes

## 🧪 Testing

To add tests, install testing libraries:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

## 📦 Build & Deployment

Build for production:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Static Hosting

The built application can be deployed to:
- Netlify
- Vercel
- AWS S3 + CloudFront
- GitHub Pages

Example nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/task-management/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:8080;
    }
}
```

## 🎯 Features in Detail

### Task Creation
1. Fill in the form fields
2. Click "Create Task"
3. Task appears in the list immediately
4. Form resets for next task

### Task Editing
1. Click "Edit" button on any task
2. Form populates with task data
3. Modify fields as needed
4. Click "Update Task" or "Cancel"

### Status Management
- Use dropdown on each task card for quick status updates
- Changes are saved immediately
- Visual feedback on success/error

### Task Deletion
- Click "Delete" button
- Confirmation dialog appears
- Task removed from list on confirmation

### Validation
- Title is required
- Due date/time must be in the future (for new tasks)
- Real-time error messages
- Form submission blocked if validation fails

## 🔒 Error Handling

The application handles:
- Network errors
- API errors
- Validation errors
- Empty states
- Loading states

Error messages are displayed in a user-friendly banner at the top of the page.

## 🎨 Customization

### Tailwind Configuration

Modify `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Breakpoints

### Component Styling

Components use Tailwind utility classes. To modify:
1. Edit class names in component JSX
2. Add custom CSS in component files
3. Update global styles in `App.css`

## 📊 Performance

- Code splitting with Vite
- Lazy loading components
- Optimized bundle size
- Fast refresh in development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Coding Guidelines

- Use TypeScript types for all props and state
- Follow React best practices
- Keep components focused and reusable
- Write meaningful commit messages
- Add comments for complex logic

## 🐛 Troubleshooting

### Common Issues

**CORS errors:**
- Ensure backend has CORS enabled
- Check API_BASE_URL is correct

**Build errors:**
- Clear node_modules and reinstall
- Check Node.js version compatibility

**API not connecting:**
- Verify backend is running on port 8080
- Check network/firewall settings

## 📄 License

This project is developed for HMCTS assessment purposes.

## 👥 Contact

For questions or issues, please contact the development team.
