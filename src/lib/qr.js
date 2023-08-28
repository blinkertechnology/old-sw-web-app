export function normalizeAddress(address) {
    // Metamask ethereum
    address = address.replace(/ethereum:(.*)@./g, "$1");

    return address;
}