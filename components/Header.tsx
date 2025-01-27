import MusicPlayer from "./MusicPlayer";

export default function Header() {
  return (
    <header className="border-b border-cyan-700 bg-black/50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-center p-4">
        <MusicPlayer />
      </div>
      <meta name="google-adsense-account" content="ca-pub-8997726626133132" />
    </header>
  );
}