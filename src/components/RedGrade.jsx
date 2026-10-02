export default function RedGrade() {
  // Maps video luminance onto the exact red palette sampled from the Quantra reference.
  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <filter id="red-grade" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0.3370 0.6067 0.4044 0 0 0.3370 0.6067 0.4044 0 0 0.3370 0.6067 0.4044 0 0 0 0 0 1 0" />
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0.090 0.101 0.120 0.143 0.167 0.189 0.210 0.229 0.244 0.256 0.267 0.277 0.285 0.294 0.302 0.310 0.318 0.325 0.333 0.341 0.348 0.355 0.362 0.369 0.376 0.383 0.390 0.397 0.405 0.413 0.422 0.431 0.441 0.451 0.462 0.474 0.486 0.500 0.515 0.532 0.551 0.573 0.599 0.628 0.662 0.699 0.737 0.770 0.795" />
          <feFuncG type="table" tableValues="0.008 0.009 0.011 0.013 0.015 0.017 0.018 0.019 0.021 0.022 0.023 0.023 0.024 0.024 0.025 0.027 0.027 0.027 0.028 0.028 0.029 0.030 0.031 0.031 0.031 0.032 0.033 0.033 0.034 0.035 0.036 0.036 0.037 0.038 0.039 0.040 0.041 0.042 0.043 0.045 0.046 0.048 0.050 0.053 0.057 0.062 0.071 0.083 0.093" />
          <feFuncB type="table" tableValues="0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.000 0.001 0.004 0.010 0.020 0.029" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
