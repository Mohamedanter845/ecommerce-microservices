output "cluster_endpoint" {
  description = "EKS Cluster endpoint"
  value       = aws_eks_cluster.eks.endpoint
}

output "cluster_certificate_authority" {
  description = "EKS Cluster CA data"
  value       = aws_eks_cluster.eks.certificate_authority[0].data
}

output "cluster_name" {
  description = "EKS Cluster name"
  value       = aws_eks_cluster.eks.name
}

output "node_group_role_arn" {
  description = "IAM Role ARN for the node group"
  value       = aws_iam_role.eks_node_group_role.arn
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "Private subnet IDs"
  value       = aws_subnet.private[*].id
}
