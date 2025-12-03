variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "eu-north-1"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnets" {
  description = "List of public subnet CIDRs"
  type        = list(string)
  default     = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "private_subnets" {
  description = "List of private subnet CIDRs"
  type        = list(string)
  default     = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "cluster_name" {
  description = "EKS Cluster Name"
  type        = string
  default     = "my-eks-cluster"
}

variable "node_group_name" {
  description = "Node Group Name"
  type        = string
  default     = "my-node-group"
}

variable "node_instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "t3.small"
}

variable "desired_capacity" {
  description = "Desired number of worker nodes"
  type        = number
  default     = 3
}

variable "max_capacity" {
  description = "Max number of worker nodes"
  type        = number
  default     = 3
}

variable "min_capacity" {
  description = "Min number of worker nodes"
  type        = number
  default     = 3
}
