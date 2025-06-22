import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ReverbCard from "./ReverbCard";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "123" }),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

import * as api from "../../service/ApiService.jsx";
vi.mock("../../service/ApiService.jsx", () => ({
  getMensajeOriginalById: vi.fn(),
  getCategoriaById: vi.fn(),
}));

describe("ReverbCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("muestra mensaje de carga", () => {
    render(<ReverbCard />);
    expect(screen.getByText(/cargando mensaje/i)).toBeInTheDocument();
  });

  it("muestra el mensaje original y sus reverberaciones con categoría", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      mensajesReverberados: [
        {
          id: 1,
          asunto: "calcetines",
          autor: "les moniques",
          cuerpo: "flores",
          adjunto: "",
          categoria: "haiku123",
        },
      ],
    });

    api.getCategoriaById.mockResolvedValueOnce({
      id: "haiku123",
      tituloCategoria: "Haiku",
    });

    render(<ReverbCard />);

    await waitFor(() => {
      expect(screen.queryByText(/cargando mensaje/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/calcetines/i)).toBeInTheDocument();
    expect(screen.getByText(/les moniques/i)).toBeInTheDocument();
    expect(screen.getByText(/flores/i)).toBeInTheDocument();

  });

  it("muestra 'Sin enlace' si la categoría no se puede cargar", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      mensajesReverberados: [
        {
          id: 1,
          asunto: "asunto sin categoría",
          autor: "alguien",
          cuerpo: "contenido",
          adjunto: "",
          categoria: "desconocida",
        },
      ],
    });

    api.getCategoriaById.mockRejectedValueOnce(new Error("Not found"));

    render(<ReverbCard />);

    await waitFor(() => {
      expect(screen.queryByText(/cargando mensaje/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/asunto sin categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/sin enlace/i)).toBeInTheDocument();
  });

  it("muestra mensaje si no hay reverberaciones", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      mensajesReverberados: [],
    });

    render(<ReverbCard />);

    await waitFor(() => {
      expect(screen.getByText(/no hay reverberaciones/i)).toBeInTheDocument();
    });
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

  it("usa el ID pasado como prop en lugar de useParams", async () => {
    api.getMensajeOriginalById.mockResolvedValueOnce({
      mensajesReverberados: [],
    });

    render(<ReverbCard id="prop-id" />);

    await waitFor(() => {
      expect(screen.getByText(/no hay reverberaciones/i)).toBeInTheDocument();
    });

    expect(api.getMensajeOriginalById).toHaveBeenCalledWith("prop-id");
  });
});
