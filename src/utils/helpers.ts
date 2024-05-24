export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export function parseResponseBody(response: { body: any}): any {
    try {
        return JSON.parse(response.body);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}