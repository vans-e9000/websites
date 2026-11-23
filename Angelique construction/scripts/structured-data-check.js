const fs = require('fs');
const files = ['index.html','services.html','about.html','projects.html','quote.html'];
const bad = /(�|harness|leverage|utilize|delve|tapestry|beacon|testament|realm|synergy|paradigm|ecosystem|game-changer|robust|seamless|cutting-edge|Here'?s the thing|Let'?s unpack|At the end of the day|In today'?s fast-paced world|Moreover,|Furthermore,)/i;
for (const f of files){
  const t = fs.readFileSync(f,'utf8');
  const m = t.match(/<title>(.*?)<\/title>/s);
  console.log('== ' + f + ' ==');
  console.log('  title:', m ? m[1] : '(none)');
  if(bad.test(t)){
    const lines = t.split(/\r?\n/);
    for (const line of lines){
      if(bad.test(line)){
        console.log('  SLOP LINE:', line.trim().slice(0,200));
      }
    }
  } else {
    console.log('  no blacklist hits');
  }
}
