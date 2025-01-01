import { useState, useEffect } from 'react';

interface LinkPreviewProps {
  url: string;
}

export function LinkPreview({ url }: LinkPreviewProps) {
  const [preview, setPreview] = useState<{
    title?: string;
    description?: string;
    image?: string;
  } | null>(null);

  useEffect(() => {
    // In a production environment, you would want to implement proper link preview
    // fetching here, possibly using a backend service or API
    setPreview({
      title: "Link Preview",
      description: "Preview information would appear here in production",
    });
  }, [url]);

  if (!preview) return null;

  return (
    <div className="mt-2 p-2 bg-muted rounded-md text-sm">
      {preview.title && <p className="font-medium">{preview.title}</p>}
      {preview.description && <p className="text-muted-foreground">{preview.description}</p>}
    </div>
  );
}