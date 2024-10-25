import axios from 'axios';
import readline from "node:readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Enter you long URL: `, async (url: string) => {
  
  try{
    const response = await shortUrl(url);
    console.log("Shortened URL: ", response);
    
  }catch(err){
    console.log(err);
  }

  rl.close();
});

async function shortUrl(longUrl: string): Promise<string> {
  const apiUrl = `http://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`;

  try{
    const response = await axios.get(apiUrl);
    
    return response.data;
  }catch(err){
    console.log(err);
    throw new Error('Failed to shorten URL');
  }
}
