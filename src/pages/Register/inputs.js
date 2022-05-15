const inputs = [
  {
    id: "1",
    type: "text",
    name: "fullname",
    placeholder: "Masukan Nama Lengkap",
    config: {
      required: "Nama Lengkap Tidak Boleh Kosong",
      pattern: {
        value: /[a-zA-Z'-'\s]+/,
        message: "Format nama lengkap tidak sesuai",
      },
    },
  },
  {
    id: "2",
    type: "text",
    name: "username",
    placeholder: "Masukan username",
    config: {
      required: "Username Tidak Boleh Kosong",
      minLength: {
        value: 6,
        message: "Minimal 6 karakter",
      },
      maxLength: {
        value: 12,
        message: "Maksimal 12 karakter",
      },
      pattern: {
        value: /^[a-zA-Z0-9]([-](?![-])|[a-zA-Z0-9]){4,10}[a-zA-Z0-9]$/,
        message: 'Username hanya boleh mengandung huruf angka dan "_"',
      },
      validate : {

      }
    },
  },
  {
    id: "3",
    type: "password",
    name: "password",
    placeholder: "Masukan password",
    config: {
      required: "Password tidak boleh kosong",
      minLength: {
        value: 8,
        message: "Minimal 8 karakter",
      },
      maxLength: {
        value: 12,
        message: "Maksimal 12 karakter",
      },
      pattern: {
        value: /(?=.{8,12})/,
        message: "Min 8 ,Max 12 Karakter",
      },
    },
  },
];


export { inputs }