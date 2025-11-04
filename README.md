# 🤖 UI & REST API Automation Demo

A comprehensive demo application showcasing **both UI automation and REST API automation** with real-time visual feedback. Perfect for demonstrating the full spectrum of automation testing - from user interface interactions to backend API calls.

## 🎯 What This Demo Includes

### Frontend Components (React + Vite)
- **UI Automation Targets**: Text inputs, buttons, dropdowns, color pickers, and counters - perfect for Selenium, Playwright, and Cypress demos
- **Interactive Elements**: Name inputs, message displays, background color changes, and increment/decrement counters
- **Real-time API Integration**: Live table that updates instantly when REST API calls are made
- **Responsive Design**: Works on desktop and mobile devices for cross-platform automation testing

### Backend API Server (Express.js)
- **Local REST API**: Real endpoints running on `localhost:3001`
- **In-Memory Storage**: Data persists during session, resets on server restart
- **Full CRUD Operations**: GET, POST, PUT, DELETE endpoints
- **CORS Enabled**: Frontend can communicate with backend seamlessly

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone or download this repository
# Navigate to the project directory
cd vscodedemo1

# Install dependencies
npm install
```

### Running the Demo

**Option 1: Run Everything at Once (Recommended)**
```bash
npm run dev:full
```
This starts both the frontend (port 5173) and backend API server (port 3001) simultaneously.

**Option 2: Run Servers Separately**
```bash
# Terminal 1 - API Server
npm run server

# Terminal 2 - Frontend
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:5173
- **API Server**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## 🔧 API Endpoints

The local REST API provides the following endpoints:

| Method | Endpoint | Description | Example |
|--------|----------|-------------|---------|
| GET | `/api/posts` | Fetch all posts | `curl http://localhost:3001/api/posts` |
| GET | `/api/posts/:id` | Fetch specific post | `curl http://localhost:3001/api/posts/1` |
| POST | `/api/posts` | Create new post | See examples below |
| PUT | `/api/posts/:id` | Update existing post | See examples below |
| DELETE | `/api/posts/:id` | Delete post | `curl -X DELETE http://localhost:3001/api/posts/1` |
| GET | `/api/health` | Server health check | `curl http://localhost:3001/api/health` |

## 🧪 Testing with Automation Tools

### cURL Examples

**Fetch Posts:**
```bash
curl -X GET "http://localhost:3001/api/posts?_limit=5"
```

**Create Post:**
```bash
curl -X POST "http://localhost:3001/api/posts" \
  -H "Content-Type: application/json" \
  -d '{"title":"Automation Test","body":"Created via API!","userId":1}'
```

**Update Post:**
```bash
curl -X PUT "http://localhost:3001/api/posts/1" \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Title","body":"Updated via API!"}'
```

**Delete Post:**
```bash
curl -X DELETE "http://localhost:3001/api/posts/1"
```

### Postman/Insomnia
1. Import the endpoints using the base URL: `http://localhost:3001/api`
2. Set Content-Type header to `application/json` for POST/PUT requests
3. Use JSON body format for creating/updating posts

### UI Automation Examples

**Playwright - UI Interaction:**
```javascript
// Fill form fields and interact with UI elements
await page.fill('input[placeholder="Enter your name"]', 'John Doe');
await page.click('button:has-text("Update Name")');
await page.fill('textarea[placeholder="Enter your message"]', 'Hello World');
await page.click('button:has-text("Update Message")');

// Verify UI updates
await expect(page.locator('.display-text')).toContainText('John Doe');
```

**Selenium WebDriver - UI Testing:**
```java
// Java example for Selenium
WebElement nameInput = driver.findElement(By.cssSelector("input[placeholder='Enter your name']"));
nameInput.sendKeys("Test User");
driver.findElement(By.xpath("//button[contains(text(), 'Update Name')]")).click();
```

### API Automation Example

**Playwright - API + UI Combo:**
```javascript
// Make API call and verify UI updates
const response = await page.request.post('http://localhost:3001/api/posts', {
  data: {
    title: 'Playwright Test',
    body: 'Created by automation',
    userId: 1
  }
});

// Verify the new post appears in the UI table
await page.click('button:has-text("Fetch Posts")');
await expect(page.locator('table')).toContainText('Playwright Test');
```

## 🎬 Perfect for Demonstrating

### UI Automation Tools
- **Selenium WebDriver**: Element interactions, form filling, button clicks
- **Playwright**: Modern browser automation with multiple browser support
- **Cypress**: E2E testing with real-time browser interaction
- **Puppeteer**: Chrome automation and testing

### API Testing Tools
- **Postman**: REST client testing and collections
- **Insomnia**: API development and testing
- **Thunder Client**: VS Code extension for API testing
- **REST Assured**: Java-based API testing framework

### Hybrid Automation (UI + API)
- **Playwright**: End-to-end testing combining UI interactions and API calls
- **Cypress**: Frontend testing with API mocking and real API integration  
- **Selenium + REST**: Browser automation paired with API validation
- **TestCafe**: Cross-browser testing with API integration

### Load Testing
- **k6**: Performance testing scripts
- **Artillery**: Load testing and performance monitoring
- **JMeter**: Performance and load testing

### CI/CD Integration
- **GitHub Actions**: Automated API testing workflows
- **Jenkins**: Continuous integration with API tests
- **GitLab CI**: DevOps pipeline integration

## 📁 Project Structure

```
vscodedemo1/
├── src/                    # React frontend source
│   ├── App.jsx            # Main React component
│   ├── App.css            # Styling
│   └── main.jsx           # React entry point
├── server.js              # Express.js API server
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔄 How It Works

1. **UI Layer**: React app with interactive elements (inputs, buttons, counters) - perfect targets for UI automation
2. **API Layer**: Express.js server provides REST endpoints with in-memory storage - ideal for API automation  
3. **Real-time Sync**: UI and API changes are immediately visible in the browser
4. **Dual Automation**: Demonstrates both UI interactions AND backend API calls in one application
5. **Visual Feedback**: Perfect for live demos where audience can see both UI and API automation results instantly

## 🛠 Available Scripts

- `npm run dev` - Start frontend development server only
- `npm run server` - Start backend API server only  
- `npm run dev:full` - Start both frontend and backend servers
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Demo Scenarios

### Scenario 1: UI Automation Demo
1. Open the app in browser (http://localhost:5173)
2. Use Selenium/Playwright to:
   - Fill in name and message fields
   - Click buttons and see instant UI updates
   - Change background colors
   - Increment/decrement counters
3. Perfect for showing browser automation capabilities

### Scenario 2: REST API Testing
1. Use Postman/cURL to interact with localhost:3001/api endpoints
2. Create, read, update, delete posts via API calls
3. Watch the web app table update in real-time
4. Demonstrate pure API automation without UI interaction

### Scenario 3: Hybrid UI + API Automation
1. Write Playwright/Cypress tests that combine:
   - UI interactions (filling forms, clicking buttons)
   - API calls (creating/deleting posts via REST)
   - Verification that UI reflects API changes
2. Show the power of full-stack automation testing

### Scenario 4: Load Testing Demo
1. Set up k6 or Artillery scripts against API endpoints
2. Run UI automation simultaneously  
3. Monitor both frontend behavior and API performance
4. Demonstrate system behavior under combined UI and API load

## 🤝 Contributing

Feel free to fork this project and adapt it for your specific automation demo needs. The codebase is designed to be simple and easily extensible.

## 📝 License

This project is intended for educational and demonstration purposes.
