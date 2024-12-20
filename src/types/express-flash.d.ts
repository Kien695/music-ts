import * as express from "express";

/**
 * Tạo khai báo cho flash trong Express Request.
 */
declare global {
  namespace Express {
    interface Request {
      flash(type: string, message: string): void;
      flash(): { [key: string]: string[] }; // Trả về các tin nhắn flash khi không có đối số
    }
  }
}
