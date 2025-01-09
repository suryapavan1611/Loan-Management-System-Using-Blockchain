# Loan-Management-3
A loan management system using blockchain is a software application that allows lenders and borrowers to interact in a secure and transparent way. Blockchain is a distributed ledger technology that records transactions in a network of nodes without the need for a central authority. By using blockchain, a loan management system can reduce the risk of fraud, lower the cost of intermediaries, and increase the efficiency of loan processing.

Proof Of Work: To start with Loan Application System we need a blockchain which works on Proof Of work Consensus Algorithm. POW will determine that enough work is done to mine the blocks which contain transaction details. 
We will use merkel trees to verify transactions. If any user detail is faked while applying for loan then it will reflect on leaf node hash and this will finally change merkle root hash. Thus with zero information of data we will know if there is alteration in original user data (name, id, cibil score, etc.)

On running the code, it will ask the following things:<br>
Click 1 : Register <br>
Click 2 : See valid Hash of user details <br>
Click 3 : Ask for loan <br>
Click 4 : Print mined blocks <br>
These actions are implenmented in the blockchain using the function such as createNewTransaction(), verifyTransaction(), proofOfWork(). <br>


Steps to run the code:
1. Download and extract the zip file.
2. Download and install node.js onto your system. 
3. <code>cd Loan-Management-3</code> directory in your system.
3. Run command <code>node test.js</code>
