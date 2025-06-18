const renderAdjunto = (adjunto) => {
  if (!adjunto) return null;

  if (adjunto.includes("youtube.com") || adjunto.includes("youtu.be")) {
    const videoAdj = adjunto.includes("youtu.be")
      ? adjunto.split("youtu.be/")[1]
      : new URLSearchParams(new URL(adjunto).search).get("v");

    return (
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoAdj}`}
        title="YouTube video"
        allowFullScreen
      ></iframe>
    );
  }

  if (/\.(jpg|jpeg|png|gif)$/i.test(adjunto)) {
    return (
      <img src={adjunto} alt="reverberacion" className="reverb-card-image" />
    );
  }

  return <p>{adjunto}</p>;
};

export default renderAdjunto;
