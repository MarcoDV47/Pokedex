import capitalizeFirstLetter from "../../scripts/capitalizeFirstLetter"

describe("capitalizeFirstLetter function", () => {
    it("should capitalize first letter of a string", () => {
        expect(capitalizeFirstLetter("testing")).toBe("Testing")
    })
})