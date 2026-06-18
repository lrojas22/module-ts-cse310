export function countdown(n:number): number {

    if(n <= 0){
        return 0;
    }

    console.log(n);

    return countdown(n - 1);
}