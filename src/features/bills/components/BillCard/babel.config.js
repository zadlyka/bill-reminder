// babel.config.js
//
// ✏️ FILE DIUPDATE
//
// Perubahan: Tambah 'react-native-reanimated/plugin' di posisi TERAKHIR.
// Ini WAJIB agar Reanimated worklet berjalan dengan benar.
//
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
      "react-native-worklets/plugin",
      "react-native-reanimated/plugin", // ← HARUS paling akhir
    ],
  };
};
