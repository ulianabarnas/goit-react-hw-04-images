import { useState } from "react";
import PropTypes from 'prop-types';
import urlPropType from 'url-prop-type';
import Modal from "components/Modal/Modal";
import { Image, Item } from "./ImageGalleryItem.styles";

export default function ImageGalleryItem({ smallUrlImg, largeUrlImg, alt }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(prev => !prev);
  };

  return (
    <>
      <Item>
        <Image
          src={smallUrlImg}
          alt={alt}
          onClick={toggleModal}
        />
      </Item>
      {isOpenModal && (
        <Modal onClick={toggleModal}>
          <img src={largeUrlImg} alt={alt} />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  smallUrlImg: urlPropType.isRequired,
  largeUrlImg: urlPropType.isRequired,
  alt: PropTypes.string.isRequired,
};