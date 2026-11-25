const FLAGS={"1": "BLITZ{efuvyg454thjre}", "2": "BLITZ{h4shcr4ck3d91x}", "3": "BLITZ{n0v4t3ch_v4ult7q}"};

function done(n){return localStorage.getItem('hh_task_'+n)==='done'}
function markDone(n){localStorage.setItem('hh_task_'+n,'done')}
function unlockNext(){let b=document.getElementById('next');if(!b)return;b.style.pointerEvents='auto';b.style.opacity='1';}
function nav(){[1,2,3].forEach(n=>{let a=document.getElementById('nav'+n);if(!a)return;
 let label='TASK 0'+n;
 if(done(n))label+=' ✓';
 else if(n>1&&!done(n-1))label+=' 🔒';
 a.textContent=label;
 if(n===1||done(n-1)){a.classList.remove('locked');a.href='task'+n+'.html';}
 else {a.classList.add('locked');a.removeAttribute('href');}
 if(location.pathname.endsWith('task'+n+'.html'))a.classList.add('active');
});}
function showFlag(n){let f=document.getElementById('flag');f.textContent=FLAGS[String(n)];f.classList.remove('hidden');}
function setResult(id,msg,ok){let e=document.getElementById(id);e.textContent=msg;e.className='result '+(ok?'ok':'bad');}
function checkTask1(){
 const v=['a','b','c'].map(x=>document.getElementById(x).value);
 if(v.join('|')==='MD5|SHA-1|SHA-256'){markDone(1);setResult('result','Task 1 completed. Task 2 unlocked; flag revealed.',true);showFlag(1);unlockNext();nav();}
 else setResult('result','Incorrect. Re-check each sample with hashid or hash-identifier.',false);
}
function checkTask2(){
 const vals=['adminpw','hrpw','financepw','supportpw'].map(id=>document.getElementById(id).value.trim());
 if(vals.join('|')==='NovaTech#2026|welcome123|summer2024|dragon2025'){markDone(2);setResult('result','All 4 passwords verified. Task 2 completed; Task 3 unlocked.',true);showFlag(2);unlockNext();nav();}
 else setResult('result','Not accepted. Crack and enter all 4 passwords (both MD5 and SHA-1 records) from leaked_credentials.txt.',false);
}
function unlockTask3(){
 const u=document.getElementById('user').value.trim(),p=document.getElementById('pass').value.trim();
 if(u==='admin'&&p==='NovaTech#2026'){markDone(3);setResult('result','Vault authenticated. Task 3 completed!',true);showFlag(3);nav();}
 else setResult('result','Authentication failed. Use the admin username and password recovered in Task 2.',false);
}
function guard(n){if(n>1&&!done(n-1)){location.replace('task'+(n-1)+'.html');return false;}if(done(n)){showFlag(n);unlockNext();}nav();return true;}
