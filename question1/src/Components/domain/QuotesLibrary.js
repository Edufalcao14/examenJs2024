class QuotesLibrary{

    static async getAllQuotes(){
        let  allQuotes='';
        const url =`http://localhost:3000/quotes`;
        try {
            const reponse = await fetch(url);
            console.log("résultat reponse " , reponse)
      
            if (!reponse.ok) {
              throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
            }
            allQuotes =  await reponse.json();
            console.log('ALL QUOTES :' , allQuotes);
          } catch (err) {
            console.error('error: ', err);
          }
          return allQuotes;
    }

}
export default QuotesLibrary;