# BLITZ – Hash Hunter

Three-stage CEH practical lab. The lab pages contain only the practical tasks; put the full scenario, questions, hints and answer key in Decode.exe using the separate Word document.

## Run in Visual Studio Code
1. Extract the ZIP.
2. Open this folder in VS Code.
3. Install the Live Server extension.
4. Right-click `index.html` and select **Open with Live Server**.
5. The browser opens Task 1.

## Student progression
- Task 1: identify sample_A = MD5, sample_B = SHA-1, sample_C = SHA-256. Correct completion reveals Flag 1 and unlocks Task 2.
- Task 2: use Kali and John the Ripper/Hashcat to crack the admin hash. Recovered password: `NovaTech#2026`. Entering it reveals Flag 2 and unlocks Task 3.
- Task 3: authenticate to the in-lab evidence vault using username `admin` and the recovered password. The vault reveals Flag 3.

## Kali setup and commands
```bash
sudo apt update
sudo apt install john hashid hash-identifier -y
```
Identify sample hashes:
```bash
hashid '<hash-value>'
```
Crack administrator MD5:
```bash
grep '^admin:' evidence/leaked_credentials.txt > admin_md5.txt
john --format=Raw-MD5 --wordlist=downloads/novatech_wordlist.txt admin_md5.txt
john --show --format=Raw-MD5 admin_md5.txt
```
For SHA-1 records, separate them first:
```bash
grep -v '^admin:' evidence/leaked_credentials.txt > sha1_hashes.txt
john --format=Raw-SHA1 --wordlist=downloads/novatech_wordlist.txt sha1_hashes.txt
john --show --format=Raw-SHA1 sha1_hashes.txt
```
Hashcat examples:
```bash
hashcat -m 0 -a 0 admin_hashes.txt downloads/novatech_wordlist.txt
hashcat -m 100 -a 0 sha1_hashes_only.txt downloads/novatech_wordlist.txt
```
Use hash-only input files for Hashcat. These examples are for this synthetic offline training dataset only.

## GitHub Pages
Push the project contents to a GitHub repository. In Settings → Pages, select Deploy from a branch, branch `main`, folder `/ (root)`. Add the published URL to Decode.exe.

## Important implementation note
Progression is stored in browser localStorage. Students should use the same browser/device throughout the lab. Because this is a static GitHub Pages exercise, client-side flags and checks are inspectable by a determined user; do not use this prototype for secure/high-stakes assessment. For stronger flag secrecy, move validation and flag release to a backend. All hashes and credentials are synthetic.
