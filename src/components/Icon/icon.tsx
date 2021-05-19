import React, { useEffect, useRef, useState } from "react";

interface UseDynamicSVGImportOptions {
  onCompleted?: (
    name: string,
    SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> | undefined
  ) => void;
  onError?: (err: Error) => void;
}

function useDynamicSVGImport(
  name: string,
  options: UseDynamicSVGImportOptions = {}
) {
  const ImportedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const { onCompleted, onError } = options;
  useEffect(() => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (
          await import(`!!@svgr/webpack?-svgo,+titleProp,+ref!./svg/${name}.svg`)
        ).default;
        onCompleted?.(name, ImportedIconRef.current);
      } catch (err) {
        onError?.(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name, onCompleted, onError]);

  return { error, loading, SvgIcon: ImportedIconRef.current };
}

interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'onError'> {
  name: string;
  onCompleted?: UseDynamicSVGImportOptions["onCompleted"];
  onError?: UseDynamicSVGImportOptions["onError"];
}

/**
 * Simple wrapper for dynamic SVG import hook. You can implement your own wrapper,
 * or even use the hook directly in your components.
 */
// TODO: fix type any
const Icon: React.FC<IconProps> = ({
  name,
  onCompleted,
  onError,
  ...rest
}): any => {
  const { error, loading, SvgIcon } = useDynamicSVGImport(name as string, {
    onCompleted,
    onError
  });
  if (error) {
    return error.message;
  }
  if (loading) {
    return "Loading...";
  }
  if (SvgIcon) {
    return <SvgIcon {...rest} />;
  }
  return '123';
};

export default Icon;
// https://stackoverflow.com/questions/61339259/how-to-dynamically-import-svg-and-render-it-inline
