import * as yup from "yup";

export const schema = yup.object().shape({
    id: yup.string().required(),
    name: yup.string().required(),
    height: yup.string().required(),
    mass: yup.string().required(),
    hair_color: yup.string().required(),
    skin_color: yup.string().required(),
    eye_color: yup.string().required(),
    birth_year: yup.string().required(),
    gender: yup.string().required(),
    homeworld: yup.string().required(),
    // films: yup.array().of(yup.string()),
    // species: yup.array().of(yup.string()),
    // vehicles: yup.array().of(yup.string()),
    // starships: yup.array().of(yup.string())
});
