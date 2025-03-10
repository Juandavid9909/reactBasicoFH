import { heroes } from "../data/heroes";

export const getHeroesByPublisher = (publisher) => {
    const validPublishers = ["Marvel Comics", "DC Comics"];

    if (!validPublishers.includes(publisher)) {
        throw new Error(`${ publisher } ist not a valid publisher`);
    }

    return heroes.filter((hero) => hero.publisher === publisher);
};