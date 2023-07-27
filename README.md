# LARGE LANGUAGE TREES

## Project Overview

This project is a text processing system aimed at conducting searches among classes generated from three different datasets. The system utilizes tokens from the GPT-3(Initially to make standardization easier) encoder, where each token represents a relationship between distinct classes with the same meaning.

## System Workflow

1. **Generation of Class Groups:**
   - Three groups of 1024 classes were created from three distinct datasets.
   - Additionally, three additional groups of 32 classes were generated, belonging to the same groups as the previous ones.
(this was initially, there will be more classes in the future)
2. **Conversion of Text to GPT-3 Tokens:**
   - The input text is pre-converted into GPT-3 encoder tokens.

3. **Hierarchical Tree of Transformations:**
   The system employs a simple initial tree with the following steps:

   **a) "Set" Stage:**
   - Transformation of tokens into 6 derived classes.
   - Generation of bidirectional hash of sequences.
   - Transformation of hashes into binary format.
   - Storage of the corresponding token using a simplified Bellman equation.

   **b) "Get" Stage:**
   - Transformation of tokens into 6 derived classes.
   - Generation of bidirectional hash of sequences.
   - Transformation of hashes into binary format.
   - Verification of binary positions and conversion back to decimal format.
   - Identification of classes in common among the found sequences.
   - Selection of the most recurring token among the common classes.

4. **Additional Components:**
   In addition to the hierarchical tree of transformations, the system incorporates two additional components:

   - **Fasttext for the Full Text:** A fasttext feature is implemented to analyze the entire text and enrich word representations.
   - **Treesearch of Primitive Classes (w2v 2/4):** A treesearch mechanism of primitive classes is used to verify the viability of the next word to be selected.

## Contributions and Improvements

This system is designed with the belief that the quality of text processing is compromised when proper data organization and careful selection are not applied. Based on this premise, the system seeks to achieve better results than traditional language models by incorporating tokens that promote geospatial orientation among classes.

Feel free to contribute improvements, bug fixes, or new features to this project. Your collaboration is essential to enhance the system and achieve even more satisfactory results.

## Installation

To install and use the system, follow the instructions in the INSTALL.md file.

## License

This project is licensed under the MIT License. See the LICENSE.md file for more information.

## Contact

If you have any questions or want to get in touch, please send an email to your-email@example.com.

Thank you for using our Class Search System with GPT-3 Tokens. We hope it proves to be valuable for your text processing and information retrieval needs.
