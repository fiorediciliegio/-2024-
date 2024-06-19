import numpy as np

def shape_functions(xi, eta):
    """Calculate shape functions for linear triangular element"""
    N = np.array([
        [1 - xi - eta],
        [xi],
        [eta]
    ])
    return N

def interpolation_matrix(nodes):
    """Calculate interpolation matrix for linear triangular elements"""
    num_nodes = len(nodes)
    num_dofs = 2  # Assuming 2D problem

    interpolation_matrix = np.zeros((num_nodes * num_dofs, num_nodes))

    for i, node in enumerate(nodes):
        x, y = node
        for j in range(num_dofs):
            interpolation_matrix[i*num_dofs + j, i] = x if j == 0 else y

    return interpolation_matrix

def main():
    # Input node coordinates
    nodes = np.array([
        [0, 2],
        [1, 0],
        [0, 1]
    ])

    # Calculate interpolation matrix
    interp_mat = interpolation_matrix(nodes)
    print("Interpolation Matrix:")
    print(interp_mat)

if __name__ == "__main__":
    main()