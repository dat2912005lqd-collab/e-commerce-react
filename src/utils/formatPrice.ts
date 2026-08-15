export function formatPrice(price:number):string{
    return new Itnl.NumberFormat(
        "en-US",{
            style:"currency",
            currency:"USD",
        }
    ).format(price)
}