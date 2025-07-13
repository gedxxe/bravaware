import React from 'react';
import Modal from './common/Modal';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const imageUrl = "/multi_task_unet_dynamic.png";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="U-Net: Multi-Task Architecture for Segmentation & Classification">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-h-[80vh] overflow-y-auto">
        
        {/* Left Column: Scientific Explanation */}
        <div className="lg:col-span-5 text-sm text-gray-300 space-y-4 pr-2 custom-scrollbar">
          
          <div>
            <h3 className="font-bold text-base text-violet-300 mb-2">1. Introduction</h3>
            <p className="leading-relaxed">
              Accurate segmentation and classification of breast lesions are critical for diagnosis and prognosis. Ultrasonography (USG) is a primary imaging modality due to its non-invasive, radiation-free, and accessible nature. This project leverages a U-Net based deep learning architecture, a highly effective model for pixel-wise semantic segmentation, to analyze USG images from the Breast Ultrasound Images (BUSI) dataset for both lesion segmentation and type classification (Normal, Benign, Malignant).
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base text-violet-300 mb-2">2. U-Net Architecture</h3>
            <p className="leading-relaxed mb-2">
              The model is based on the U-Net architecture, renowned for its performance in biomedical imaging. Its structure consists of two main pathways:
            </p>
            <ul className="space-y-2 list-inside text-gray-400">
              <li>
                <strong className="text-gray-200">Contracting Path (Encoder):</strong> Captures hierarchical contextual features. It comprises repeating blocks of 3x3 convolutions (with ReLU activation) followed by a 2x2 max pooling operation for down-sampling. At each step, spatial dimensions are halved and feature channels are doubled.
              </li>
              <li>
                <strong className="text-gray-200">Expansive Path (Decoder):</strong> Enables precise localization by reconstructing spatial information. It involves up-sampling the feature maps (via transposed convolutions), followed by concatenation with corresponding feature maps from the encoder via <strong className="text-white">skip connections</strong>. These connections are vital, propagating fine-grained details to the decoder to recover sharp object boundaries, which is crucial for segmenting lesions in noisy USG images.
              </li>
            </ul>
          </div>
          
           <div>
            <h3 className="font-bold text-base text-violet-300 mb-2">3. Application in Breast Cancer Analysis</h3>
            <p className="leading-relaxed">
              The U-Net is trained on the BUSI dataset to map an input USG image to a pixel-wise mask that delineates the lesion area. Preprocessing steps such as intensity normalization and data augmentation (rotation, flipping) are employed to improve model robustness against variations in USG images. Performance is evaluated using metrics like the Dice Coefficient and Intersection over Union (IoU).
            </p>
          </div>

           <div>
            <h3 className="font-bold text-base text-violet-300 mb-2">4. Extension for Multi-Task Classification</h3>
            <p className="leading-relaxed mb-2">
              This model extends the standard U-Net into a multi-task framework. The rich feature map from the encoder's bottleneck layer serves a dual purpose:
            </p>
             <ul className="space-y-2 list-inside text-gray-400">
                <li>It initiates the expansive path for <strong className="text-gray-200">segmentation</strong>.</li>
                <li>It is flattened and passed to a classification head, comprising fully connected layers and a <strong className="text-gray-200">Softmax</strong> activation function to predict one of three classes: <strong className="text-white">Normal</strong>, <strong className="text-green-400">Benign</strong>, or <strong className="text-red-400">Malignant</strong>.</li>
             </ul>
            <p className="leading-relaxed mt-2">
              This joint training on both segmentation and classification losses allows the model to learn a more robust feature representation, improving both tasks simultaneously.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base text-violet-300 mb-2">5. Challenges and Future Directions</h3>
            <p className="leading-relaxed">
              USG images pose challenges like speckle noise and operator variability. While this model is effective, future work could explore attention mechanisms to focus on more relevant features, handle class imbalance more explicitly, and integrate explainable AI (XAI) methods to increase clinical trust and interpretability.
            </p>
          </div>

        </div>

        {/* Right Column: Architecture Image */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center bg-black/20 rounded-lg p-2">
          <img
            src={imageUrl}
            alt="Bravaware Multi-Task U-Net Model Architecture"
            className="w-full h-auto object-contain rounded-md"
            loading="lazy"
          />
           <p className="text-xs text-gray-400 mt-2 text-center">
             This diagram illustrates the multi-task U-Net architecture used for both segmentation and classification.
           </p>
        </div>

      </div>
    </Modal>
  );
};

export default ArchitectureModal;