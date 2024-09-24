export let scaleX;
export let scaleY;
export let innerW
export let innerH

export function updateScale(innerWidth, innerHeight, newScaleX, newScaleY) {
    scaleX = newScaleX;
    scaleY = newScaleY;
    innerW = innerWidth
    innerH = innerHeight
}
