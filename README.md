# Local Kubernetes and HPA Examples - DevDays2022 - CM.com

## Prerequisite
- Docker Desktop (including Kubernetes support)
- For my applications and loadtest I've used Node.js, but you can use any language you want to create your container image and loadtest tool.

## Get the cluster running
* Download latest Docker Desktop and use your license if you need to. You can use Rancher Desktop if you want to as well, that requires no license.
* Enable Kubernetes within Docker Desktop.
* Check `kubectl get pods`

## Get our application building and deployed
* docker build .\application\ -t localhpatest
* To test so far: docker run -p 8080:8080 localhpatest:latest

* kubectl apply -f application\deployment.yml
* kubectl get pods
* kubectl apply -f application\service.yml
* kubectl get services

## Get Ingress-NGinx ready to make our cluster available from outside the cluster
* kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.2.0/deploy/static/provider/cloud/deploy.yaml
* kubectl apply -f application\ingress.yml

## Loadtest (autocannon example), but you can use K6, JMeter, anything you'd like
* Change the config, all speaks for itself quite well.
```
cd loadtest
npm i
node .\index.js > result.txt
```

## Get a Metric-server, so we can autoscale on those metrics
* We need to use 0.4.5, as the 1.24 K8s has some issues with the recent metric-servers.
* Recent version is here: https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

* add tls insecurity line 139:         
    - --kubelet-insecure-tls
* Optional, if it doesn't work: Change following, local clusters are slow.
    - --metric-resolution=30s
* kubectl apply -f .\metric-server\0.4.5-components.yml

## HPA
* kubectl apply -f application\hpa.yml
* kubectl describe hpa
* You can start some loadtests, and see your application scale.

## Credits:
I've used parts of the initial setup from the guide by Daniel Trimble:
@(https://medium.com/@dstrimble/kubernetes-horizontal-pod-autoscaling-for-local-development-d211e52c309c)