import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ReverbCard from "./ReverbCard";
import * as api from "../../service/ApiService.jsx"; 

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "123" }),
    Link: ({ to, children }) => <a href={to}>{children}</a>, 
  };
});

vi.mock("../../service/ApiService.jsx", () => ({
  getMensajeOriginalById: vi.fn(),
}));

describe("ReverbCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje de carga", () => {
    render(<ReverbCard />);
    expect(screen.getByText(/cargando mensaje/i)).toBeInTheDocument();
  });

  it("muestra el mensaje original y sus reverberaciones", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      asuntoMensajeOriginal: "Asunto de prueba",
      mensajesReverberados: [
        {
          id: 1,
          asunto: "calcetines",
          autor: "les moniques",
          cuerpo: "flores",
          adjunto: "",
          categoria: "haiku",
        },
      ],
    });

    render(<ReverbCard />);

    await waitFor(() => {
      expect(screen.getByText(/asunto de prueba/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/calcetines/i)).toBeInTheDocument();
    expect(screen.getByText(/les moniques/i)).toBeInTheDocument();
    expect(screen.getByText(/flores/i)).toBeInTheDocument();
    expect(screen.getByText(/haiku/i)).toBeInTheDocument();
  });

  it("muestra mensaje si no se encuentra el mensaje original", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce(null);

    render(<ReverbCard />);

    await waitFor(() => {
      expect(
        screen.getByText(/no se encontró el mensaje/i)
      ).toBeInTheDocument();
    });
  });

  it("muestra mensaje si no hay reverberaciones", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      asuntoMensajeOriginal: "Asunto sin reverberaciones",
      mensajesReverberados: [],
    });

    render(<ReverbCard />);

    await waitFor(() => {
      expect(
        screen.getByText(/no hay reverberaciones/i)
      ).toBeInTheDocument();
    });
  });
});
