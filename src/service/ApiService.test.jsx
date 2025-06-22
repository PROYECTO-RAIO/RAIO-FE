import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import {
  getAllMensajesReverberados,
  getMensajeReverberadoById,
  getMensajeOriginalById,
  getAllMensajesOriginales,
} from "./ApiService.jsx";

vi.mock("axios");

let consoleErrorSpy;

describe("ApiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("getAllMensajesReverberados", () => {
    it("should fetch all reverberated messages successfully", async () => {
      const mockData = [
        { id: 1, subject: "Reverb 1" },
        { id: 2, subject: "Reverb 2" },
      ];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getAllMensajesReverberados();

      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/mensajes-reverberados"
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors when fetching all reverberated messages", async () => {
      const errorMessage = "Network Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getAllMensajesReverberados()).rejects.toThrow(errorMessage);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al obtener las reverberaciones"
      );
    });
  });

  describe("getMensajeReverberadoById", () => {
    it("should fetch a reverberated message by ID successfully", async () => {
      const mockId = 123;
      const mockData = { id: mockId, subject: "Reverb by ID" };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getMensajeReverberadoById(mockId);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/api/v1/mensajes-reverberados/${mockId}`
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors when fetching a reverberated message by ID", async () => {
      const mockId = 123;
      const errorMessage = "Not Found";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getMensajeReverberadoById(mockId)).rejects.toThrow(
        errorMessage
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al obtener la reverberación por Id"
      );
    });
  });

  describe("getMensajeOriginalById", () => {
    it("should fetch an original message by ID successfully", async () => {
      const mockId = 456;
      const mockData = { id: mockId, subject: "Original by ID" };
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getMensajeOriginalById(mockId);

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8080/api/v1/mensajes-originales/${mockId}`
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors when fetching an original message by ID", async () => {
      const mockId = 456;
      const errorMessage = "Server Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(getMensajeOriginalById(mockId)).rejects.toThrow(
        errorMessage
      );
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al obtener el mensaje original:",
        expect.any(Error)
      );
    });
  });

  describe("getAllMensajesOriginales", () => {
    it("should fetch all original messages successfully", async () => {
      const mockData = [
        { id: 10, subject: "Original 1" },
        { id: 11, subject: "Original 2" },
      ];
      axios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getAllMensajesOriginales();

      expect(axios.get).toHaveBeenCalledWith(
        "http://localhost:8080/api/v1/mensajes-originales"
      );
      expect(result).toEqual(mockData);
    });

    it("should handle errors when fetching all original messages", async () => {
      const errorMessage = "Timeout Error";
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const result = await getAllMensajesOriginales();

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error al obtener los mensajes originales",
        expect.any(Error)
      );
      expect(result).toBeUndefined();
    });
  });
});
