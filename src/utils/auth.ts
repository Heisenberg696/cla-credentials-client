import { LoginRequest, LoginResponse } from "@/types/auth";

const API_BASE = "https://api.clacredentials.com";

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE}/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    return response.json();
  }

  static async logout(): Promise<void> {
    const token = this.getToken();
    if (!token) return;

    try {
      await fetch(`${API_BASE}/api/v1/logout`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      this.clearSession();
    }
  }

  static saveSession(token: string, user: any): void {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    }
  }

  static getToken(): string | null {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("access_token");
      return token && token !== "undefined" && token !== "null" ? token : null;
    }
    return null;
  }

  static getUser(): any | null {
    if (typeof window !== "undefined") {
      const userString = sessionStorage.getItem("user");
      if (userString && userString !== "undefined" && userString !== "null") {
        try {
          return JSON.parse(userString);
        } catch (error) {
          console.error("Error parsing user data:", error);
          this.clearSession();
          return null;
        }
      }
    }
    return null;
  }

  static clearSession(): void {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
    }
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
