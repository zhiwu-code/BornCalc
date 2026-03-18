export default function BornLogo({ className }: { className?: string }) {
      const basePath = import.meta.env.BASE_URL;
      return (
              <img
                        className={className}
                        src={`${basePath}born-logo-white.png`}
                        alt="Børn"
                        style={{ height: '40px', width: 'auto' }}
                      />
            );
}
