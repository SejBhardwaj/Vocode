// API Service for communicating with the backend
// Uses relative URLs — Vite proxy forwards /api/* to http://localhost:5000 in dev

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

class APIService {
  /**
   * Refine user's raw idea using AI
   * @param {string} rawIdea - The user's initial website idea
   * @returns {Promise<Object>} Refined idea with structured data
   */
  async refineIdea(rawIdea) {
    try {
      console.log('API Service: Refining idea:', rawIdea);
      console.log('API Base URL:', API_BASE_URL);
      
      const response = await fetch(`${API_BASE_URL}/api/idea-refine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rawIdea }),
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      return data;
    } catch (error) {
      console.error('Error refining idea:', error);
      throw error;
    }
  }

  /**
   * Generate multiple website plans based on refined idea
   * @param {Object} refinedIdea - The refined website concept
   * @returns {Promise<Object>} Multiple website plans
   */
  async generatePlans(refinedIdea) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/plan-generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refinedIdea }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating plans:', error);
      throw error;
    }
  }

  /**
   * Generate website code from selected plan
   * @param {Object} plan - The selected website plan
   * @param {Object} refinedIdea - The refined website concept
   * @returns {Promise<Object>} Generated code and dependencies
   */
  async generateCode(plan, refinedIdea) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/code-generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, refinedIdea }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error generating code:', error);
      throw error;
    }
  }

  /**
   * Edit existing website code based on user request
   * @param {string} currentCode - The current website code
   * @param {string} editRequest - The user's edit request
   * @returns {Promise<Object>} Updated code and change description
   */
  async editCode(currentCode, editRequest) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentCode, editRequest }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error editing code:', error);
      throw error;
    }
  }

  /**
   * Download website project as ZIP file
   * @param {string} code - The website code to download
   * @returns {Promise<Blob>} ZIP file blob
   */
  async downloadProject(code) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error downloading project:', error);
      throw error;
    }
  }

  /**
   * Check if the backend server is running
   * @returns {Promise<Object>} Health status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking health:', error);
      throw error;
    }
  }
}

// Export a singleton instance
const apiService = new APIService();
export default apiService;
