# share-connections

My attempt to share connection amongst child processes in nodejs.
In this example, main process is establishing a mongodb connection and other child processes are attempting to use it via a combination of IPC channel and EventEmitter.
Very very messy currently.

Work in Progess, hopefully 🙂
