# Run ParkEase from VS Code

1. In VS Code, choose **File → Open Folder…** and open the `ParkEase` folder.
2. Make sure MongoDB is running. For a local MongoDB install, the default connection is `mongodb://127.0.0.1:27017/parkease`.
3. In the VS Code terminal, install dependencies once:

   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```

4. If this is your first run, copy `server/.env.example` to `server/.env`, set a private `JWT_SECRET`, then seed the administrator and sample parking spaces:

   ```bash
   npm run seed
   ```

5. Choose **Terminal → Run Build Task… → ParkEase: Start website** (or press **Cmd+Shift+B**). This starts the API and frontend in the VS Code terminal.
6. Open [http://localhost:5173](http://localhost:5173) in your browser.

To stop the website, focus the task terminal and press **Ctrl+C**. Keep MongoDB running while you use ParkEase.
