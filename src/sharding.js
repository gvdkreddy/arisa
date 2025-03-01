const { ClusterManager } = require("discord-hybrid-sharding");
const { token } = require(`../config.json`);

const manager = new ClusterManager(`./src/index.js`,{
    token : token,
    totalClusters : 1,
    totalShards : 2,
    shardsPerClusters : 2
});

manager.spawn({delay : 10000,timeout :-1,amount : manager.totalShards});
manager.on('clusterCreate',cluster => { console.log(`[CLUSTER] => Cluster Launched ${cluster.id}`)});
manager.on("clusterReady",cluster => { console.log(`[CLUSTER] => Cluster is Ready ${cluster.id}`)});