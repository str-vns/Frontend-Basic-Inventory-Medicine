export const medType = [
  'Tablet',
  'Capsule',
  'Liquid',
  'Suppositories',
  'Drops',
  'Inhalers',
  'Injections',
  'Implants',
  'Creams',
  'Patches',
]

export const medMeasurement = [
    "mg",
    "g",
    "ml",
    "L",
    "oz",
    "cc",
    "IU",
    "mcg",
    "pcs",
    "units",
]

export const itemsList = [
  {
    title: "Manufacturer",
    placeholder: "Enter manufacturer name",
    type: "text",
    required: true,
  },
  {
    title: "Price",
    placeholder: "Enter price",
    type: "number",
    required: true,
  },
  {
    title: "Quantity",
    placeholder: "Enter quantity",
    type: "number",
    required: true,
  },
  {
    title: 'Medicine Type',
    type: 'Select',
    required: true,
  },
  {
    title: 'Medicine Measurement',
    type: 'Select',
    required: true,
  },
  {
    title: 'Expiration Date',
    type: 'Calendar',
    required: true,
  },

];