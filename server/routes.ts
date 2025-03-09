import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to handle contact form submissions
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email, and message are required' });
      }
      
      // Here you would typically store the contact request or send an email
      // For now we'll just return a success response
      
      return res.status(200).json({ 
        success: true, 
        message: 'Message received successfully'
      });
    } catch (error) {
      console.error('Error handling contact form submission:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while processing your request'
      });
    }
  });

  // API endpoint to get wood products
  app.get('/api/products', async (req, res) => {
    try {
      // This would typically come from a database
      // For this example, it's hardcoded in the client
      return res.status(200).json({ 
        success: true, 
        message: 'Products retrieved successfully',
        data: [] // We're not using this as data is hardcoded in the frontend
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'An error occurred while retrieving products'
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
