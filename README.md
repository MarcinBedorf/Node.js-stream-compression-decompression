Using the 'zlib' module for Streams, the utility compresses the file taken as input in the terminal.  
For example:  
>**node streamencrypt.js movie.mp4 compressedMovie.mp4 password123**

The file is additionally encrypted with SALT.
A similar tool decrypts and decompresses a previously changed file.  
Stream, unlike Buffer, potentially saves RAM and allows processing of much larger data.
