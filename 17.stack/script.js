const results = Splitting();
results[0].chars.forEach((char,idx)=>{
 char.style.setProperty('--delay',6000 - idx*1500);
 console.log(char);
});