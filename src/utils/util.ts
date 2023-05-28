export const getRandomNumber = (min: number, max: number): number => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
};
export const getRandomArrayElements = (arr: number[], n: number): number[] => {
	const res = Array(n).fill(0);
	let len = arr.length;
	const elements = Array.from(arr);
	for (let i = 0; i < n; i++) {
		const index = getRandomNumber(0, len - 1);
		res[i] = elements[index];
		elements.splice(index, 1);
		len--;
	}
	return res;
};
