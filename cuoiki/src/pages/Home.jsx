export default function Home() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>Home</h1>
      <picture>
        <source srcSet="/images/Anh3.webp" type="image/webp" />
        <img
          src="/images/Anh4.jpg"
          alt="Hero banner"
          loading="lazy"
          width="1200"
          height="600"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        />
        <img
          src="/images/Anh2.jpg"
          alt="Hero banner"
          loading="lazy"
          width="1200"
          height="600"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        />
        <img
          src="/images/Anh4.jpg"
          alt="Hero banner"
          loading="lazy"
          width="1200"
          height="600"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        />
        <img
          src="/images/2.jpg"
          alt="Hero banner"
          loading="lazy"
          width="1200"
          height="600"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        />
        <img
          src="/images/Anh4.jpg"
          alt="Hero banner"
          loading="lazy"
          width="1200"
          height="600"
          style={{ width: "100%", height: "auto", borderRadius: 12 }}
        />
      </picture>
      <p>Welcome! Ảnh trên dùng WebP + lazy loading + kích thước cố định để giảm CLS.</p>
    </div>
  );
}
